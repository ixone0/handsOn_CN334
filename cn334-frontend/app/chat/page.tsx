'use client';

import React, { useState } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMsg.trim()) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Guard Clause: ตรวจสอบก่อนว่ามี API Key หรือไม่
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY in environment variables');
    }

    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setUserMsg('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: 'You are a Thai HealthCare Assistant. Answer in Thai.' }] },
            contents: [{ parts: [{ text: userMsg }] }],
          }),
        }
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'ไม่มีคำตอบ';

      setMessages([...newMessages, { role: 'model', text: reply }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages([...newMessages, { role: 'model', text: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 font-sans">
      <header className="w-full max-w-md bg-white border border-slate-200 p-4 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">TU-PINE Care</h1>
        <span className="text-sm text-slate-500">AI Chat</span>
      </header>

      <main className="w-full max-w-md bg-white border border-slate-200 shadow-sm flex flex-col" style={{ height: '60vh' }}>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-slate-400 mt-10">เริ่มต้นการสนทนากับ AI ผู้ช่วยด้านสุขภาพ</p>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-2xl rounded-bl-none text-sm">
                กำลังพิมพ์...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-4 flex gap-2">
          <input
            type="text"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            ส่ง
          </button>
        </div>
      </main>
    </div>
  );
}
