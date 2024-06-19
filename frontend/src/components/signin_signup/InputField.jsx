import React from 'react'

function InputField({label, name, type, placeholder,margins, children}) {
  return (
    <div className={margins}>
      <label className="text-xs block mb-2">{label}</label>
      <div className="relative flex items-center">
        <input
          name={name}
          type={type}
          required
          className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
          placeholder={placeholder}
        />
      {children}
      </div>
    </div>
  );
}

export default InputField