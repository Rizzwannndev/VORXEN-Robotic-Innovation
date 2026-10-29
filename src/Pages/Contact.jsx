import { useLayoutEffect, useRef, useState } from "react";
import Decode from "../components/Decode";
import Socials from "../components/Socials";
import { PrimaryAction } from "../components/Action";
import { contactEmail } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const GUTTER = "px-5 sm:px-8 lg:px-12";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is missing. Tell the system who is calling.";
  if (!EMAIL_RE.test(email.trim())) errors.email = "That address can't be reached. Use the form name@domain.com.";
  if (message.trim().length < 10) errors.message = "Message is too short. Write at least 10 characters.";
  return errors;
}

function Field({ id, label, error, multiline, ...props }) {
  const Input = multiline ? "textarea" : "input";
  return (
    <div className="group">
      <label htmlFor={id} className="t-label flex justify-between text-dim transition-colors group-focus-within:text-diag">
        <span>{label}</span>
        {error && <span className="text-warn">Error</span>}
      </label>
      <Input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full resize-none border-0 border-b bg-transparent py-3 text-xl text-phos transition-colors outline-none focus:border-diag ${
          error ? "border-warn" : "border-rule"
        }`}
        rows={multiline ? 5 : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="t-label mt-2 text-warn">
          {error}
        </p>
      )}
    </div>
  );
}

const Contact = () => {
  const root = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const online = Boolean(contactEmail);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-rise]", { y: 30, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, []);

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: validate(next)[e.target.name] }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    const subject = encodeURIComponent(`VORXEN link request from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} <${values.email.trim()}>`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <main ref={root} className={`min-h-svh pt-36 pb-28 lg:pt-44 ${GUTTER}`}>
      <h1 className="font-display text-[clamp(2.4rem,8.4vw,6rem)] leading-[0.95] tracking-[0.02em] text-phos">
        <Decode text="ESTABLISH" duration={700} className="block" />
        <Decode text="LINK" duration={700} delay={200} className="block" />
      </h1>
      <div className="mt-14 grid gap-16 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p data-rise className="max-w-[42ch] text-lg leading-relaxed text-dim">
            VORXEN is a concept system designed and built by Rizwan Waseem. For collaborations, studio work, or
            questions about how it was made, open a channel.
          </p>
          <div data-rise className="mt-12">
            <p className="t-label mb-4 text-dim">Channels</p>
            <Socials className="flex-col gap-y-2" />
          </div>
        </div>

        <div data-rise className="lg:col-span-6 lg:col-start-7">
          {online ? (
            <form noValidate onSubmit={submit} className="space-y-10" aria-describedby="form-status">
              <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={update} error={errors.name} />
              <Field
                id="email"
                label="Return address"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={update}
                error={errors.email}
              />
              <Field
                id="message"
                label="Message"
                multiline
                value={values.message}
                onChange={update}
                error={errors.message}
              />
              <div className="flex flex-wrap items-center justify-between gap-6">
                <p id="form-status" role="status" className="t-label text-dim">
                  {status === "sent" ? (
                    <span className="text-diag">Handed off to your mail app. Send it from there.</span>
                  ) : (
                    "Opens your mail app with the message ready"
                  )}
                </p>
                <PrimaryAction type="submit">
                  Transmit
                </PrimaryAction>
              </div>
            </form>
          ) : (
            <div>
              <p className="t-label text-warn">Direct line offline</p>
              <p className="mt-4 max-w-[40ch] text-xl leading-relaxed text-phos">
                The direct line isn’t connected yet. Channels come online as their addresses are registered.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contact;
