const AuthLayouts = (props) => {
    const { children, title } = props;
    return (
        <div className="flex justify-center items-center min-h-screen px-4 py-4 
            bg-yellow-50">
            <div className="flex flex-col md:flex-row w-full max-w-[90%] sm:max-w-4xl 
                bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                rotate-1">
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-black text-black mb-6 uppercase 
                        transform -rotate-2">{title}</h1>
                    <p className="font-bold text-black mb-8 text-lg">
                        Selamat Datang, monggo {title} rumiyen!
                        <br />
                        Usernamenya "admin"
                        <br />
                        Passwordnya "password123"
                    </p>
                    {children}
                </div>
                <div
                    className="w-full md:w-1/2 border-l-4 border-black min-h-[300px] md:min-h-full
                        bg-cover bg-center transform rotate-2"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070')",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default AuthLayouts;