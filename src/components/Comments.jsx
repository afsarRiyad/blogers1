import { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function Comments() {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.comment) return;
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', comment: '' });
      setSubmitted(false);
    }, 2500);
  };

  return (
    <section className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-dark-100">
      <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shrink-0">
          <MessageSquare size={15} className="sm:w-[18px] sm:h-[18px]" />
        </div>
        <div>
          <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-dark-900">
            Share Your Opinion
          </h3>
          <p className="text-[11px] sm:text-xs text-dark-500 mt-0.5 hidden sm:block">Leave a Comment and Connect with the Author</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-6 lg:p-7 shadow-soft">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 animate-pulse">
              <CheckCircle size={28} className="sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-dark-900">Comment Submitted Successfully!</h4>
            <p className="text-xs sm:text-sm text-dark-600 max-w-md mx-auto leading-relaxed">
              Thank you for your feedback. Your comment will appear after admin approval.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-dark-700 mb-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <User size={12} className="text-primary-600" />
                    Name
                  </span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-xs sm:text-sm text-dark-800 placeholder:text-dark-400"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-dark-700 mb-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail size={12} className="text-primary-600" />
                    Email
                  </span>
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-xs sm:text-sm text-dark-800 placeholder:text-dark-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-dark-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare size={12} className="text-primary-600" />
                   Your Comment
                </span>
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={4}
                placeholder="Write your thoughts here..."
                className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-xs sm:text-sm text-dark-800 placeholder:text-dark-400 resize-none scrollbar-thin"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl btn-primary-gradient text-white font-bold text-xs sm:text-sm transition-all shadow-glow hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <Send size={15} className="sm:w-4 sm:h-4" />
               Post Comment
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
