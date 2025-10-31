import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';


// --- SVG Icons ---
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);
const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
);


// --- Placeholder Data ---
const categories = [
    { name: 'Oversized Tees', image: 'https://images.pexels.com/photos/19642646/pexels-photo-19642646.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', href: '#' },
    { name: 'Hoodies', image: 'https://images.pexels.com/photos/20433283/pexels-photo-20433283.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', href: '#' },
    { name: 'Accessories', image: 'https://images.pexels.com/photos/16844222/pexels-photo-16844222/free-photo-of-man-in-a-black-bucket-hat.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', href: '#' },
];

const trendingProducts = [
    { name: 'Basti Vibe Tee', image: 'https://images.pexels.com/photos/20433282/pexels-photo-20433282.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', backImage: 'https://images.pexels.com/photos/20433281/pexels-photo-20433281.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '₹1,299', tag: 'New Drop' },
    { name: 'Neon Nights Hoodie', image: 'https://images.pexels.com/photos/16844243/pexels-photo-16844243/free-photo-of-man-in-a-black-hoodie.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', backImage: 'https://images.pexels.com/photos/16844244/pexels-photo-16844244/free-photo-of-man-in-a-black-hoodie-with-a-graphic.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '₹2,499', tag: 'Limited Edition' },
    { name: 'Urban Explorer Tee', image: 'https://images.pexels.com/photos/19642647/pexels-photo-19642647.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', backImage: 'https://images.pexels.com/photos/19642648/pexels-photo-19642648.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '₹1,499', tag: '' },
    { name: 'Concrete Jungle Tee', image: 'https://images.pexels.com/photos/19642650/pexels-photo-19642650.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', backImage: 'https://images.pexels.com/photos/19642649/pexels-photo-19642649.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '₹1,399', tag: 'Best Seller' },
    { name: 'Desi Funk Hoodie', image: 'https://images.pexels.com/photos/20433284/pexels-photo-20433284.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', backImage: 'https://images.pexels.com/photos/20433285/pexels-photo-20433285.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '₹2,599', tag: '' },
];


// --- Components ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="text-3xl font-montserrat font-black tracking-tighter">
                            BOLD<span className="text-brand-green">BASTI</span>
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="hover:text-brand-green transition-colors">Home</a>
                        <a href="#shop" className="hover:text-brand-green transition-colors">Shop</a>
                        <a href="#about" className="hover:text-brand-green transition-colors">About Us</a>
                        <a href="#contact" className="hover:text-brand-green transition-colors">Contact</a>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="hidden md:block hover:text-brand-green transition-colors"><SearchIcon className="h-6 w-6" /></button>
                        <button className="hover:text-brand-green transition-colors"><HeartIcon className="h-6 w-6" /></button>
                        <button className="hover:text-brand-green transition-colors"><ShoppingBagIcon className="h-6 w-6" /></button>
                        <button className="hidden md:block hover:text-brand-green transition-colors"><UserIcon className="h-6 w-6" /></button>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                     <div className="md:hidden pb-4 space-y-2">
                        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded">Home</a>
                        <a href="#shop" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded">Shop</a>
                        <a href="#about" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded">About Us</a>
                        <a href="#contact" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded">Contact</a>
                        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded">Account</a>
                    </div>
                )}
            </nav>
        </header>
    );
};

const Hero = () => (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
             <source src="https://videos.pexels.com/video-files/7845353/7845353-hd_1920_1080_25fps.mp4" type="video/mp4" />
             Your browser does not support the video tag.
        </video>
        <div className="relative z-20 container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-montserrat tracking-tighter leading-tight animate-fade-in-down">
                Street <span className="text-brand-green">Bold</span>. Desi <span className="text-brand-pink">Soul</span>.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up">
                Premium oversized T-shirts and urban clothing, born in the streets of India.
            </p>
            <a
                href="#shop"
                className="mt-8 inline-block bg-brand-green text-brand-dark font-bold py-3 px-10 rounded-full text-lg uppercase tracking-wider transform hover:scale-105 transition-transform animate-fade-in-up"
            >
                Shop Now
            </a>
        </div>
    </section>
);


const FeaturedCategories = () => (
    <section id="categories" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <a href={category.href} key={category.name} className="group relative overflow-hidden rounded-lg">
                        <img src={category.image} alt={category.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h3 className="text-3xl font-bold text-white uppercase tracking-widest">{category.name}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

interface ProductCardProps {
    product: {
        name: string;
        image: string;
        backImage?: string;
        price: string;
        tag?: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group relative overflow-hidden">
            <div className="relative w-full aspect-[3/4]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                {product.backImage && (
                    <img
                        src={product.backImage}
                        alt={`${product.name} (back)`}
                        className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    />
                )}
            </div>
            {product.tag && (
                 <span className="absolute top-4 left-4 bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase">{product.tag}</span>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="text-brand-green font-bold">{product.price}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col space-y-3">
                    <button className="bg-white/90 text-brand-dark font-bold py-2 px-6 rounded-full hover:bg-white">Add to Cart</button>
                    <button className="bg-transparent text-white border-2 border-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-brand-dark">Quick View</button>
                </div>
            </div>
        </div>
    );
};

const TrendingProducts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(4);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsToShow(1);
            else if (window.innerWidth < 1024) setItemsToShow(2);
            else setItemsToShow(4);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? Math.max(0, trendingProducts.length - itemsToShow) : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= trendingProducts.length - itemsToShow ? 0 : prev + 1));
    };
    
    return (
        <section id="shop" className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                     <h2 className="text-3xl md:text-4xl font-bold font-montserrat">Trending Now</h2>
                     <div className="flex space-x-4">
                        <button onClick={prevSlide} className="p-2 rounded-full bg-gray-800 hover:bg-brand-green hover:text-black transition-colors disabled:opacity-50" disabled={currentIndex === 0}><ChevronLeftIcon className="w-6 h-6" /></button>
                        <button onClick={nextSlide} className="p-2 rounded-full bg-gray-800 hover:bg-brand-green hover:text-black transition-colors disabled:opacity-50" disabled={currentIndex >= trendingProducts.length - itemsToShow}><ChevronRightIcon className="w-6 h-6" /></button>
                     </div>
                </div>
                <div className="overflow-hidden relative" ref={sliderRef}>
                     <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
                        {trendingProducts.map((product, index) => (
                           <div key={index} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsToShow}%` }}>
                                <ProductCard product={product} />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const BrandStory = () => (
    <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold font-montserrat mb-4">Made for the Streets of <span className="text-brand-green">India</span>.</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
                BoldBasti is more than a brand—it’s a movement born in the Indian streets. We fuse urban aesthetics with desi culture to create clothing that speaks your language, your vibe, your story.
            </p>
            <a href="#" className="text-brand-green font-bold text-lg group">
                Our Story
                <ArrowRightIcon className="inline-block h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    </section>
);

const Footer = () => (
    <footer id="contact" className="bg-black pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-montserrat font-black tracking-tighter">BOLD<span className="text-brand-green">BASTI</span></h3>
                    <p className="mt-4 text-gray-400 max-w-sm">Join the movement. Wear your story. Street Bold. Desi Soul.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold uppercase tracking-wider mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#shop" className="text-gray-400 hover:text-white">Shop</a></li>
                        <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
                        <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                    </ul>
                </div>
                
                {/* Newsletter */}
                <div>
                     <h4 className="font-bold uppercase tracking-wider mb-4">Join The Basti</h4>
                     <p className="text-gray-400 mb-4">Get exclusive drops & offers straight to your inbox.</p>
                     <form className="flex">
                         <input type="email" placeholder="Enter your email" className="bg-gray-800 border border-gray-700 w-full py-2 px-3 text-white focus:outline-none focus:border-brand-green rounded-l-md" />
                         <button type="submit" className="bg-brand-green text-brand-dark font-bold py-2 px-4 rounded-r-md">Go</button>
                     </form>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} BoldBasti. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);


// --- AI Fashion Advisor Component ---

type Message = {
    sender: 'user' | 'ai';
    text: string;
    sources?: { uri: string; title: string }[];
};

const FashionAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hey! I'm your BoldBasti AI Stylist. Ask me anything about fashion, trends, or how to style your gear." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `You are a fashion advisor for an Indian streetwear brand called "BoldBasti". Your tone is cool, urban, and helpful. The brand's tagline is "Street Bold. Desi Soul." Keep your answers concise and relevant to streetwear and Indian youth fashion culture. User's query: "${inputValue}"`,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            const aiText = response.text;
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            const sources = groundingChunks
                ?.map(chunk => ({
                    uri: chunk.web?.uri || '',
                    title: chunk.web?.title || 'Source'
                }))
                .filter(source => source.uri);

            const aiMessage: Message = { sender: 'ai', text: aiText, sources: sources && sources.length > 0 ? sources : undefined };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error("AI Error:", err);
            const errorMessage: Message = { sender: 'ai', text: 'Sorry, I\'m having trouble connecting right now. Please try again later.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-green text-brand-dark rounded-full p-4 shadow-lg hover:bg-white transition-colors"
                    aria-label="Open AI Stylist"
                >
                    <SparklesIcon className="w-8 h-8" />
                </button>
            </div>

            <div className={`fixed bottom-0 right-0 z-50 w-full h-full sm:bottom-6 sm:right-6 sm:w-96 sm:h-auto sm:max-h-[80vh] bg-brand-dark border border-gray-700 rounded-t-lg sm:rounded-lg shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-16'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <h3 className="font-bold flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-brand-green"/> AI Stylist</h3>
                    <button onClick={() => setIsOpen(false)} className="hover:text-brand-green"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-brand-green text-brand-dark' : 'bg-gray-800 text-white'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-gray-600">
                                            <h4 className="text-xs font-bold mb-1 opacity-70">Sources:</h4>
                                            <ul className="space-y-1">
                                                {msg.sources.map((source, i) => (
                                                    <li key={i}>
                                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-green hover:underline flex items-start">
                                                          <LinkIcon className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                                                          <span className="truncate">{source.title}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-lg bg-gray-800 text-white">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>
                
                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex-shrink-0">
                    <div className="flex items-center bg-gray-800 rounded-full">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a style question..."
                            className="w-full bg-transparent py-2 px-4 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !inputValue.trim()} className="p-2 text-brand-green rounded-full m-1 disabled:opacity-50 disabled:cursor-not-allowed">
                          <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};


const App = () => {

    useEffect(() => {
        const handleSmoothScroll = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Find the closest anchor tag
            const anchor = target.closest('a[href^="#"]');

            if (anchor) {
                const href = anchor.getAttribute('href');
                // Ensure it's a valid hash link and not just "#"
                if (href && href.length > 1) {
                    event.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleSmoothScroll);
        };
    }, []);

    return (
        <div className="bg-brand-dark text-white font-poppins">
            <Header />
            <main>
                <Hero />
                <FeaturedCategories />
                <TrendingProducts />
                <BrandStory />
            </main>
            <Footer />
            <FashionAI />
        </div>
    );
};

export default App;
