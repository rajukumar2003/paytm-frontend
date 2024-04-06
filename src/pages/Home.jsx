import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
export function Home() {
    const navigate = useNavigate();

    return (<>
        <AppBar/>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-300 to-blue-300">
            <div className="max-w-lg text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Welcome to PayTM</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard
                        title="Sign Up"
                        description="Join PayTM today! Create your account and start enjoying our services."
                        buttonText="Sign Up"
                        onClick={() => navigate('./signup')}
                    />
                    <FeatureCard
                        title="Sign In"
                        description="Already have an account? Log in to access your account."
                        buttonText="Sign In"
                        onClick={() => navigate('./signin')}
                    />
                    <FeatureCard
                        title="Send Money"
                        description="Easily send money to friends and family with just a few clicks."
                        buttonText="Send Money"
                        onClick={() => navigate('./signin')}
                    />
                    <FeatureCard
                        title="Dashboard"
                        description="View your account summary, transaction history, and manage your profile."
                        buttonText="Dashboard"
                        onClick={() => navigate('./dashboard')}
                    />
                </div>
            </div>
        </div>
    </>);
}

function FeatureCard({ title, description, buttonText, onClick }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <ButtonComponent label={buttonText} onClick={onClick} />
        </div>
    );
}
