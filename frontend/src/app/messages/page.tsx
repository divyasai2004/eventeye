"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon, ArrowLeftIcon, PaperAirplaneIcon, PlusCircleIcon, PaperClipIcon, FaceFrownIcon, TrashIcon } from "@heroicons/react/24/solid";
import Card from "../components/Card";
import Button from "../components/Button";

interface Thread {
  _id: string;
  participants: { email: string; _id: string }[];
  messages: Message[];
}
interface Message {
  _id: string;
  sender?: { email: string };
  text?: string;
  fileUrl?: string;
  fileName?: string;
  timestamp?: string;
}

export default function Messages() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [startingNew, setStartingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");
    if (!token) {
      router.replace("/login");
      return;
    }
    setRole(userRole || "");
    setEmail(userEmail || "");
    setLoading(true);
    fetch("http://localhost:5000/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setThreads(data.threads || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (!isClient) return null;

  const selectThread = async (thread: Thread) => {
    setSelectedThread(thread);
    setMessages([]);
    setError("");
    setSuccess("");
    setNewMessage("");
    setFile(null);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${thread._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError("Failed to load messages");
    }
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      if (!startingNew && selectedThread) {
        formData.append("recipientId", selectedThread.participants.find((p) => p.email !== email)?._id || "");
      }
      formData.append("message", newMessage);
      if (file) formData.append("file", file);
      if (startingNew) {
        formData.append("recipientEmail", recipientEmail);
      }
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setSuccess("Message sent!");
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (startingNew) {
        setStartingNew(false);
        setRecipientEmail("");
        setThreads((prev) => [...prev, data.thread]);
        setSelectedThread(data.thread);
        setMessages(data.thread.messages);
      } else {
        setMessages(data.thread.messages);
      }
    } catch (err) {
      if (err instanceof Error) {
      setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSending(false);
    }
  };

  const handleStartNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    try {
      const resUser = await fetch(`http://localhost:5000/api/users/by-email/${recipientEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await resUser.json();
      if (!resUser.ok) throw new Error(userData.error || "User not found");
      const recipientId = userData.user._id;
      const formData = new FormData();
      formData.append("recipientId", recipientId);
      formData.append("message", newMessage);
      if (file) formData.append("file", file);
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setSuccess("Message sent!");
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setStartingNew(false);
      setRecipientEmail("");
      setThreads((prev) => [...prev, data.thread]);
      setSelectedThread(data.thread);
      setMessages(data.thread.messages);
    } catch (err) {
      if (err instanceof Error) {
      setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!selectedThread) return;
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${selectedThread._id}/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete message");
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-6 px-4 sm:py-8 sm:px-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 fadeInUp">
        {/* Thread List - Enhanced Sidebar */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Messages</h2>
          </div>
          
          <button 
            onClick={() => { setStartingNew(true); setSelectedThread(null); setMessages([]); setError(""); setSuccess(""); }}
            className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            <PlusCircleIcon className="h-5 w-5" /> 
            New Conversation
          </button>
          
          <div className="overflow-y-auto max-h-[400px] space-y-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-500 mb-4"></div>
                <p className="text-gray-500 text-sm font-medium">Loading conversations...</p>
              </div>
            ) : threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <FaceFrownIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-700 font-semibold mb-2">No conversations yet</p>
                <p className="text-gray-500 text-sm leading-relaxed">Start a new conversation to<br />connect with others!</p>
              </div>
            ) : (
              threads.map((thread, idx) => {
                const other = thread.participants.filter((p: { email: string }) => p.email !== email)[0];
                const avatarLetter = other && other.email ? other.email[0].toUpperCase() : '?';
                const isSelected = selectedThread && selectedThread._id === thread._id;
                return (
                  <div 
                    key={thread._id || idx} 
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200'
                    } hover:shadow-sm hover:scale-[1.02] flex items-center gap-3`} 
                    onClick={() => selectThread(thread)}
                  >
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-white shadow-sm ${
                        isSelected ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        {avatarLetter}
                      </div>
                      {thread.messages.length > 0 && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{other && other.email}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                        {thread.messages.length} message{thread.messages.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Message Area - Enhanced Chat Interface */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
          {startingNew ? (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Start New Conversation</h3>
                <p className="text-gray-600 text-sm">Send a message to begin a new conversation</p>
              </div>
              
              <form onSubmit={handleStartNew} className="space-y-5" encType="multipart/form-data">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Email</label>
                  <input 
                    type="email" 
                    value={recipientEmail} 
                    onChange={e => setRecipientEmail(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors" 
                    placeholder="Enter email address..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors resize-none" 
                    placeholder="Type your message..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attachment</label>
                  <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <PaperClipIcon className="h-5 w-5 text-gray-400" /> 
                    <span className="text-gray-600">Choose file...</span>
                    <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                  {file && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm text-blue-700 font-medium">{file.name}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  
                  {sending ? "Sending..." : "Send Message" }
                  
                </Button>
                
                {error && (
                  <div className="w-full text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="w-full text-green-700 bg-green-50 border border-green-200 rounded-xl p-3 text-sm">
                    {success}
                  </div>
                )}
              </form>
            </div>
          ) : selectedThread ? (
            <div className="flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  {(() => {
                    const other = selectedThread.participants.filter((p: { email: string }) => p.email !== email)[0];
                    const avatarLetter = other && other.email ? other.email[0].toUpperCase() : '?';
                    return (
                      <>
                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-sm">
                          {avatarLetter}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{other && other.email}</div>
                          <div className="text-xs text-gray-500">
                            {messages.length} message{messages.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                      <FaceFrownIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">No messages yet</p>
                    <p className="text-gray-500 text-sm">Send a message to start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg: Message) => {
                    const avatarLetter = msg.sender && msg.sender.email ? msg.sender.email[0].toUpperCase() : '?';
                    const isMine = msg.sender && msg.sender.email === email;
                    return (
                      <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? 'flex-row-reverse' : ''}`}>
                          <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-white text-sm shadow-sm ${
                            isMine ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                          }`}>
                            {avatarLetter}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 shadow-sm relative group ${
                            isMine 
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                              : 'bg-white border border-gray-200 text-gray-800'
                          }`}>
                            {msg.text && <div className="text-sm leading-relaxed">{msg.text}</div>}
                            {msg.fileUrl && (
                              <a 
                                href={`http://localhost:5000${msg.fileUrl}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`flex items-center gap-2 mt-2 p-2 rounded-lg transition-colors ${
                                  isMine 
                                    ? 'bg-white/20 hover:bg-white/30 text-white' 
                                    : 'bg-gray-50 hover:bg-gray-100 text-blue-600'
                                }`}
                              >
                                <PaperClipIcon className="h-4 w-4" /> 
                                <span className="text-xs font-medium">{msg.fileName || "Download file"}</span>
                              </a>
                            )}
                            <div className={`text-xs mt-2 ${isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                              {msg.timestamp && new Date(msg.timestamp).toLocaleString()}
                            </div>
                            {isMine && (
                              <button 
                                title="Delete message" 
                                onClick={() => handleDeleteMessage(msg._id)} 
                                className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200"
                              >
                                <TrashIcon className="h-3 w-3 text-white" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSend} className="flex gap-3 items-end" encType="multipart/form-data">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={newMessage} 
                      onChange={e => setNewMessage(e.target.value)} 
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors" 
                      placeholder="Type a message..."
                    />
                    <label className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <PaperClipIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
                    </label>
                  </div>
                  <button
                    type="submit" 
                    disabled={sending}
                    className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
                
                {file && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">{file.name}</span>
                  </div>
                )}
                
                {error && (
                  <div className="mt-2 text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mt-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-3 text-sm">
                    {success}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
              <div className="p-6 bg-gray-100 rounded-2xl mb-6">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Messages</h3>
              <p className="text-gray-600 max-w-sm leading-relaxed">Select a conversation from the sidebar or start a new one to begin messaging.</p>
            </div>
          )}
          
          {/* Back to Dashboard Button */}
          <div className="p-6 border-t border-gray-100">
            <a 
              href="/dashboard" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5" /> 
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";
// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { ChatBubbleLeftRightIcon, ArrowLeftIcon, PaperAirplaneIcon, PlusCircleIcon, PaperClipIcon, FaceFrownIcon, TrashIcon } from "@heroicons/react/24/solid";
// import Card from "../components/Card";
// import Button from "../components/Button";

// interface Thread {
//   _id: string;
//   participants: { email: string; _id: string }[];
//   messages: Message[];
// }
// interface Message {
//   _id: string;
//   sender?: { email: string };
//   text?: string;
//   fileUrl?: string;
//   fileName?: string;
//   timestamp?: string;
// }

// export default function Messages() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [threads, setThreads] = useState<Thread[]>([]);
//   const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [startingNew, setStartingNew] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setIsClient(true);
//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("userRole");
//     const userEmail = localStorage.getItem("userEmail");
//     if (!token) {
//       router.replace("/login");
//       return;
//     }
//     setRole(userRole || "");
//     setEmail(userEmail || "");
//     setLoading(true);
//     fetch("http://localhost:5000/api/messages", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setThreads(data.threads || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [router]);

//   if (!isClient) return null;

//   const selectThread = async (thread: Thread) => {
//     setSelectedThread(thread);
//     setMessages([]);
//     setError("");
//     setSuccess("");
//     setNewMessage("");
//     setFile(null);
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:5000/api/messages/${thread._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setMessages(data.messages || []);
//     } catch (err) {
//       setError("Failed to load messages");
//     }
//   };

//   const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSending(true);
//     setError("");
//     setSuccess("");
//     const token = localStorage.getItem("token");
//     try {
//       const formData = new FormData();
//       if (!startingNew && selectedThread) {
//         formData.append("recipientId", selectedThread.participants.find((p) => p.email !== email)?._id || "");
//       }
//       formData.append("message", newMessage);
//       if (file) formData.append("file", file);
//       if (startingNew) {
//         formData.append("recipientEmail", recipientEmail);
//       }
//       const res = await fetch("http://localhost:5000/api/messages", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to send message");
//       setSuccess("Message sent!");
//       setNewMessage("");
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       if (startingNew) {
//         setStartingNew(false);
//         setRecipientEmail("");
//         setThreads((prev) => [...prev, data.thread]);
//         setSelectedThread(data.thread);
//         setMessages(data.thread.messages);
//       } else {
//         setMessages(data.thread.messages);
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//       setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleStartNew = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSending(true);
//     setError("");
//     setSuccess("");
//     const token = localStorage.getItem("token");
//     try {
//       const resUser = await fetch(`http://localhost:5000/api/users/by-email/${recipientEmail}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const userData = await resUser.json();
//       if (!resUser.ok) throw new Error(userData.error || "User not found");
//       const recipientId = userData.user._id;
//       const formData = new FormData();
//       formData.append("recipientId", recipientId);
//       formData.append("message", newMessage);
//       if (file) formData.append("file", file);
//       const res = await fetch("http://localhost:5000/api/messages", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to send message");
//       setSuccess("Message sent!");
//       setNewMessage("");
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       setStartingNew(false);
//       setRecipientEmail("");
//       setThreads((prev) => [...prev, data.thread]);
//       setSelectedThread(data.thread);
//       setMessages(data.thread.messages);
//     } catch (err) {
//       if (err instanceof Error) {
//       setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleDeleteMessage = async (messageId: string) => {
//     if (!selectedThread) return;
//     if (!window.confirm("Are you sure you want to delete this message?")) return;
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:5000/api/messages/${selectedThread._id}/${messageId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to delete message");
//       setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
//     } catch (err) {
//       alert("Failed to delete message");
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-4 px-1 sm:py-8 sm:px-2">
//       <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 fadeInUp">
//         {/* Thread List */}
//         <Card className="w-full md:w-1/3">
//           <div className="flex items-center gap-3 mb-6 sm:mb-8">
//             <ChatBubbleLeftRightIcon className="h-10 w-10 sm:h-12 sm:w-12 text-purple-500" />
//             <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-purple-700">Messages</h2>
//           </div>
//           <button onClick={() => { setStartingNew(true); setSelectedThread(null); setMessages([]); setError(""); setSuccess(""); }}
//             className="mb-4 sm:mb-6 flex items-center gap-2 px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition text-base sm:text-lg">
//             <PlusCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" /> New Message
//           </button>
//           <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px]">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-8 sm:py-12">
//                 <svg className="animate-spin h-8 w-8 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
//                 <p className="text-gray-400 text-lg">Loading threads...</p>
//               </div>
//             ) : threads.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-8 sm:py-12">
//                 <FaceFrownIcon className="h-12 w-12 sm:h-16 sm:w-16 text-purple-200 mb-4" />
//                 <p className="text-purple-700 text-lg sm:text-xl font-semibold mb-2">No threads yet</p>
//                 <p className="text-gray-500">Start a new conversation to connect with sponsors or clubs!</p>
//               </div>
//             ) : (
//               threads.map((thread, idx) => {
//                 const other = thread.participants.filter((p: { email: string }) => p.email !== email)[0];
//                 const avatarLetter = other && other.email ? other.email[0].toUpperCase() : '?';
//                 return (
//                   <div key={thread._id || idx} className={`p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 cursor-pointer border ${selectedThread && selectedThread._id === thread._id ? 'bg-purple-100 border-purple-400' : 'bg-purple-50 border-purple-200'} hover:bg-purple-200 hover:scale-[1.03] transition-all duration-200 ease-in-out flex items-center gap-3`} onClick={() => selectThread(thread)}>
//                     <span className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-white font-bold text-base shadow">
//                       {avatarLetter}
//                     </span>
//                     <div className="flex-1">
//                       <div className="font-semibold text-purple-700 text-sm sm:text-base truncate">{other && other.email}</div>
//                       <div className="text-xs text-gray-500 mt-1">{thread.messages.length} messages</div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </Card>
//         {/* Message Area */}
//         <Card className="w-full md:w-2/3">
//           {startingNew ? (
//             <form onSubmit={handleStartNew} className="flex flex-col gap-4 sm:gap-6 bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-8 shadow-inner" encType="multipart/form-data">
//               <div>
//                 <label className="font-medium mb-1 text-purple-700">Recipient Email</label>
//                 <input type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} required className="w-full border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
//               </div>
//               <div>
//                 <label className="font-medium mb-1 text-purple-700">Message</label>
//                 <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} className="w-full border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
//               </div>
//               <div>
//                 <label className="font-medium mb-1 text-purple-700 flex items-center gap-2 cursor-pointer">
//                   <PaperClipIcon className="h-5 w-5" /> Attach File
//                   <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
//                   {file && <span className="ml-2 text-sm text-gray-600">{file.name}</span>}
//                 </label>
//               </div>
//               <Button type="submit" disabled={sending}>
//                 <PaperAirplaneIcon className="h-5 w-5 sm:h-6 sm:w-6" /> {sending ? "Sending..." : "Send"}
//               </Button>
//               {error && <div className="w-full text-red-600 mt-2 text-center bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>}
//               {success && <div className="w-full text-green-600 mt-2 text-center bg-green-50 border border-green-200 rounded-lg p-2">{success}</div>}
//             </form>
//           ) : selectedThread ? (
//             <div className="flex flex-col h-full bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-8 shadow-inner transition-all duration-300">
//               <div className="flex-1 overflow-y-auto mb-4 max-h-60 sm:max-h-80">
//                 {messages.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-8 sm:py-12">
//                     <FaceFrownIcon className="h-12 w-12 sm:h-16 sm:w-16 text-purple-200 mb-4" />
//                     <p className="text-purple-700 text-lg sm:text-xl font-semibold mb-2">No messages yet</p>
//                     <p className="text-gray-500">Send a message to start the conversation!</p>
//                   </div>
//                 ) : (
//                   messages.map((msg: Message) => {
//                     const avatarLetter = msg.sender && msg.sender.email ? msg.sender.email[0].toUpperCase() : '?';
//                     const isMine = msg.sender && msg.sender.email === email;
//                     return (
//                       <div key={msg._id} className={`mb-3 flex ${isMine ? 'justify-end' : 'justify-start'} transition-all`}>
//                         <div className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : ''}`}>
//                           <span className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ${isMine ? 'bg-gradient-to-br from-blue-400 to-purple-400' : 'bg-gradient-to-br from-purple-400 to-blue-400'} text-white font-bold text-base shadow`}>
//                             {avatarLetter}
//                           </span>
//                           <div
//                             className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-[70%] ${isMine ? 'bg-blue-200 text-right' : 'bg-purple-200 text-left'} shadow relative transition-all`}
//                             style={isMine ? { paddingRight: '2.5rem' } : {}}
//                           >
//                             {msg.text && <div className="text-base mb-1">{msg.text}</div>}
//                             {msg.fileUrl && (
//                               <a href={`http://localhost:5000${msg.fileUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 underline hover:text-blue-900 focus:ring-2 focus:ring-blue-400 transition">
//                                 <PaperClipIcon className="h-5 w-5" /> {msg.fileName || "Download file"}
//                               </a>
//                             )}
//                             <div className="text-[10px] text-gray-400 mt-1">{msg.timestamp && new Date(msg.timestamp).toLocaleString()}</div>
//                             {isMine && (
//                               <button title="Delete message" onClick={() => handleDeleteMessage(msg._id)} className="absolute top-2 right-2 p-1 rounded hover:bg-red-100 transition" style={{ zIndex: 10 }}>
//                                 <TrashIcon className="h-4 w-4 text-red-500" />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//               <form onSubmit={handleSend} className="flex gap-2 mt-auto items-center" encType="multipart/form-data">
//                 <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1 border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" placeholder="Type a message..." />
//                 <label className="flex items-center cursor-pointer">
//                   <PaperClipIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 hover:text-purple-600 transition" />
//                   <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
//                 </label>
//                 <Button type="submit" disabled={sending}>
//                   <PaperAirplaneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
//                 </Button>
//               </form>
//               {error && <div className="w-full text-red-600 mt-2 text-center bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>}
//               {success && <div className="w-full text-green-600 mt-2 text-center bg-green-50 border border-green-200 rounded-lg p-2">{success}</div>}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-8 shadow-inner">
//               <ChatBubbleLeftRightIcon className="h-10 w-10 sm:h-16 sm:w-16 text-purple-200 mb-4" />
//               <p className="text-gray-400 text-lg sm:text-xl">Select a thread or start a new message.</p>
//             </div>
//           )}
//           <a href="/dashboard" className="mt-6 sm:mt-10 inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base sm:text-lg shadow hover:from-purple-600 hover:to-blue-600 transition">
//             <ArrowLeftIcon className="h-5 w-5" /> Back to Dashboard
//           </a>
//         </Card>
//       </div>
//     </div>
//   );
// } 