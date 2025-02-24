"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

interface Props {
    isRegister?: boolean;
}

const AuthForm = ({ isRegister = false }: Props) => {
    const { loginUser, registerUser } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    // Esquema de validación con Yup
    const schema = yup.object().shape({
        name: isRegister ? yup.string().required("El nombre es obligatorio") : yup.mixed().notRequired(),
        email: yup.string().email("Email inválido").required("El email es obligatorio"),
        password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
        confirmPassword: isRegister
            ? yup.string()
                .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
                .required("Confirma tu contraseña")
            : yup.mixed().notRequired(),
    });

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Manejo del envío del formulario
    const onSubmit = async (data: any) => {
        if (isRegister) {
            await registerUser(data.name, data.email, data.password);
        } else {
            await loginUser(data.email, data.password);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.titleContainer}>
                    <h1>
                        {isRegister ? (
                            <>
                                If an opportunity doesn't, <span className={styles.breakText}>knock, build a <span className={styles.blueText}>door</span>!</span>
                            </>                              
                        ) : (
                            <>
                                Logout the past, <span className={styles.breakText}>login to the <span className={styles.blueText}>new</span>!</span>
                            </>
                        )}
                    </h1>

                    <h5 className={styles.subtitle}>
                        {isRegister ? (
                            <> A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away </>

                        ): (
                            <></>
                        )}
                        
                    </h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {isRegister && (
                        <div className={styles.inputContainer}>
                            <label htmlFor="name" className={styles.label}>Full name</label>
                            <input
                                id="name"
                                type="text"
                                className={styles.input}
                                {...register("name")}
                            />
                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        </div>
                    )}
                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.label}>E-mail Address</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            {...register("email")}
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>

                    {/* Forgot Password en login */}
                    {!isRegister && (
                        <p className={styles.forgotPassword} onClick={() => router.push("/reset-password")}>
                            ¿Forgot Password?
                        </p>
                    )}

                    <div className={styles.inputContainer}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={styles.input}
                                {...register("password")}
                            />
                            <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>

                    {/* Input de Confirmación de Contraseña solo en Registro */}
                    {isRegister && (
                        <div className={styles.inputContainer}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={styles.input}
                                    {...register("confirmPassword")}
                                />
                                <span className={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility}>
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                        </div>
                    )}

                    {/* Checkbox de "Remember my password" solo en Login */}
                    {!isRegister && (
                        <div className={styles.rememberMeContainer}>
                            <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className={styles.checkboxCustom} // Mismo estilo que Terms & Conditions
                            />
                            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Remember my password</label>
                        </div>
                    )}


                    {/* Checkbox de "Terms & Conditions" solo en Register */}
                    {isRegister && (
                        <div className={styles.termsContainer}>
                            <input
                            type="checkbox"
                            id="terms"
                            className={styles.checkboxCustom}
                            />
                            <label htmlFor="terms" className={styles.termsLabel}>
                            I agree to all the Term of 
                            <a href="/terms" className={styles.termsLink}> conditions </a> & 
                            <a href="/privacy-policy" className={styles.termsLink}> Privacy Policy</a>
                            </label>
                        </div>
                    )}

                    <button type="submit" className={styles.button}>
                        {isRegister ? "Create Account" : "Login"}
                    </button>

                    {/* Enlace de inicio de sesión solo en la página de registro */}
                    {isRegister && (
                    <p className={styles.loginLink}>
                        Already have an account? <a href="/login">Log In</a>
                    </p>
                    )}

                    {!isRegister && (
                        <p className={styles.signupLink}>
                            Don’t have an account? <a href="/register">Sign Up</a>
                        </p>
                    )}
                </form>
            </div>
            <div className={styles.rightPanel}>
                {/* Imagen agregada arriba del texto */}
                <img src="/barkita.webp" alt="Team Collaboration" className={styles.panelImage} />
                <h1>Where <span className={styles.yellowUnderline}>remote</span> teams <span className={styles.breakText}> get work done </span> </h1>
                <h6>The online collaborative whiteboard platform to bring teams together, anytime, anywhere</h6>
            </div>
        </div>
    );
};

export default AuthForm;



