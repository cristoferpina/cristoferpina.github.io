import { useState, useRef } from "react";
import githubIcon from '../../assets/images/github.png';
import linkedinIcon from '../../assets/images/linkedin.png';
import instagramIcon from '../../assets/images/instagram.png';
import redditIcon from '../../assets/images/reddit.png';

function Label(props) {
    return (
        <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
            {props.children}
        </label>
    );
}

function Input(props) {
    return (
        <input
            className="w-full rounded-lg border border-[#2C3E50]/20 bg-white px-4 py-3 text-[#2C3E50] placeholder:text-[#2C3E50]/40 shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#73433F]"
            {...props}
        />
    );
}

function TextArea(props) {
    return (
        <textarea
            className="w-full resize-y rounded-lg border border-[#2C3E50]/20 bg-white px-4 py-3 text-[#2C3E50] placeholder:text-[#2C3E50]/40 shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#73433F]"
            {...props}
        />
    );
}

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPPw9YvAto3Na9jEZWgWZ00jbvQZhHsVTa3MQiLF7x2TpRFO5gRA-pFIvWfAiCnWPZ/exec";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = {
            nombre: nameRef.current.value,
            correo: emailRef.current.value,
            asunto: messageRef.current.value
        };

        if (!formData.nombre || !formData.correo || !formData.asunto) {
            setMessage("Por favor completa todos los campos");
            setMessageType("error");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage("¡Mensaje enviado exitosamente!");
                setMessageType("success");
                
                nameRef.current.value = "";
                emailRef.current.value = "";
                messageRef.current.value = "";
            } else {
                setMessage("Error al enviar el mensaje. Intenta de nuevo.");
                setMessageType("error");
            }

        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType("error");
        } finally {
            setLoading(false);
            
            setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 5000);
        }
    };

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/cristoferpina",
            icon: githubIcon
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/cristoferpiña/",
            icon: linkedinIcon
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/imcristoferpina",
            icon: instagramIcon
        },
        {
            name: "Reddit",
            url: "https://www.reddit.com/user/cristoferpina/",
            icon: redditIcon
        }
    ];

    return (
        <section 
            id="contact"
            style={{
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                width: '100vw',
                maxWidth: '100vw',
                minHeight: '100vh',
                backgroundColor: '#F2E9E1',
                position: 'relative'
            }}
            className="text-[#2C3E50] flex flex-col items-center justify-center py-16 px-6"
        >
            <div className="max-w-xl w-full relative z-10">
                <h2 className="text-5xl font-bold text-center mb-10">Contacto</h2>

                <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-8 ring-1 ring-black/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label>Nombre</Label>
                            <Input 
                                type="text"
                                placeholder="Tu nombre" 
                                ref={nameRef}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label>Correo electrónico</Label>
                            <Input 
                                type="email"
                                placeholder="tu@email.com" 
                                ref={emailRef}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label>Mensaje</Label>
                            <TextArea 
                                placeholder="Escribe tu mensaje..." 
                                ref={messageRef}
                                rows={6}
                                required
                                disabled={loading}
                            />
                        </div>
                        
                        {message && (
                            <div className={`p-4 rounded-lg text-sm font-medium ${
                                messageType === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {message}
                            </div>
                        )}
                        
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-lg bg-[#73433F] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#73433F]/90 focus:outline-none focus:ring-2 focus:ring-[#73433F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                                {loading ? "Enviando..." : "Enviar"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Redes sociales */}
                <div className="mt-10 text-center">
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social) => (
                            <a 
                                key={social.name}
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group"
                                aria-label={social.name}
                            >
                                <div className="bg-[#73433F] rounded-full p-4 flex items-center justify-center transition-all duration-300 group-hover:opacity-80 group-hover:scale-110 shadow-lg">
                                    <img 
                                        src={social.icon.src} 
                                        alt={social.name} 
                                        className="w-8 h-8" 
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}