"use client";

import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error for the field while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Remove previous status message when user starts typing again
        setStatus({
            type: "",
            message: "",
        });
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Please enter a subject.";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Please enter your message.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Stop submission if validation fails
        if (!validateForm()) {
            return;
        }

        setIsSending(true);

        setStatus({
            type: "",
            message: "",
        });

        try {
            // Check that EmailJS environment variables exist
            const serviceId =
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

            const templateId =
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

            const publicKey =
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error(
                    "EmailJS environment variables are missing."
                );
            }

            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                publicKey
            );

            // Success
            setStatus({
                type: "success",
                message:
                    "Message sent successfully! We'll get back to you soon.",
            });

            // Clear form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            setErrors({});
        } catch (error) {
            console.error("EmailJS Error:", error);

            setStatus({
                type: "error",
                message:
                    "Something went wrong while sending your message. Please try again.",
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="bg-white text-[#3A2A22]">

            {/* Contact Hero */}
            <section className="px-4 pt-8 sm:px-6 lg:px-10">
                <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[320px]">

                    {/* Hero Image */}
                    <Image
                        src="/abouthero3.jpg"
                        alt="LUMÉA skincare"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Hero Text */}
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div className="text-white">
                            <p className="mb-3 text-xs tracking-[0.3em]">
                                CONTACT
                            </p>

                            <h1 className="text-3xl font-light sm:text-4xl md:text-5xl">
                                Let&apos;s Connect
                            </h1>

                            <p className="mx-auto mt-3 max-w-md text-sm text-white/90 sm:text-base">
                                We&apos;re here to help with your skincare journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
                <div className="grid gap-16 lg:grid-cols-2">

                    {/* Left - Visit Us */}
                    <div>
                        <p className="mb-3 text-xs font-medium tracking-[0.25em] text-[#7D8B72]">
                            FIND US
                        </p>

                        <h2 className="text-3xl font-light sm:text-4xl">
                            Visit Us At
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-7 text-[#3A2A22]/70">
                            We&apos;d love to welcome you into the world of LUMÉA.
                            Visit us in-store and discover skincare created with
                            simplicity, care, and intention.
                        </p>

                        {/* Address */}
                        <div className="mt-10">
                            <h3 className="text-sm font-medium">
                                Our Address
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#3A2A22]/70">
                                24 Wellness Avenue
                                <br />
                                Abuja, Nigeria
                            </p>
                        </div>

                        {/* Opening Hours */}
                        <div className="mt-8">
                            <h3 className="text-sm font-medium">
                                Opening Hours
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#3A2A22]/70">
                                Monday – Saturday
                                <br />
                                9:00 AM – 6:00 PM
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8">
                            <h3 className="text-sm font-medium">
                                Follow Us
                            </h3>

                            <div className="mt-4 flex gap-6 text-sm text-[#3A2A22]/70">
                                <span>Instagram</span>
                                <span>Facebook</span>
                                <span>TikTok</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div className="rounded-2xl border border-[#E5D8C8] bg-white/40 p-6 sm:p-8">

                        <p className="mb-3 text-xs font-medium tracking-[0.25em] text-[#7D8B72]">
                            GET IN TOUCH
                        </p>

                        <h2 className="text-3xl font-light">
                            Send a Message
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#3A2A22]/60">
                            Have a question about our products or your order?
                            Send us a message and we&apos;ll get back to you.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    className="w-full border-b border-[#E5D8C8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#3A2A22]/40 focus:border-[#7D8B72]"
                                />

                                {errors.name && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full border-b border-[#E5D8C8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#3A2A22]/40 focus:border-[#7D8B72]"
                                />

                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                    className="w-full border-b border-[#E5D8C8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#3A2A22]/40 focus:border-[#7D8B72]"
                                />

                                {errors.subject && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    required
                                    className="w-full resize-none border-b border-[#E5D8C8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#3A2A22]/40 focus:border-[#7D8B72]"
                                />

                                {errors.message && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSending}
                                className="mt-2 w-full rounded-full bg-[#3A2A22] px-6 py-4 text-sm text-white transition hover:bg-[#7D8B72] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSending
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>

                            {/* Status Message */}
                            {status.message && (
                                <div
                                    className={`flex items-start gap-3 rounded-xl border px-4 py-4 text-sm ${
                                        status.type === "success"
                                            ? "border-[#7D8B72]/30 bg-[#7D8B72]/10 text-[#3A2A22]"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    {status.type === "success" ? (
                                        <CheckCircle
                                            size={20}
                                            className="mt-0.5 shrink-0 text-[#7D8B72]"
                                        />
                                    ) : (
                                        <AlertCircle
                                            size={20}
                                            className="mt-0.5 shrink-0"
                                        />
                                    )}

                                    <p>{status.message}</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}