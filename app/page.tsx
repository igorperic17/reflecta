export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Welcome to Reflecta</h1>
      <p className="text-xl mb-8">Your AI-powered therapy assistant</p>
      <div className="flex gap-4">
        <a 
          href="/auth/login" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </a>
        <a 
          href="/auth/register" 
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Register
        </a>
      </div>
    </div>
  );
} 