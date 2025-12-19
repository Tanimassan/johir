import {
    Droplet,
    Stethoscope,
    Heart,
    Car,
    Truck,
    Shield,
    Building2,
    Zap,
    Wrench,
    Headphones,
    Search,
    DollarSign,
    GraduationCap,
    Hotel,
    Utensils,
    Factory
} from "lucide-react";

export const services = [
    { name: "রক্ত", icon: Droplet, slug: "rokto", bg: "bg-red-100", color: "text-red-500" },
    { name: "ডায়াগনস্টিক", icon: Stethoscope, slug: "diagnostic", bg: "bg-blue-100", color: "text-blue-500" },
    { name: "ওয়েলফেয়ার সার্ভিস", icon: Heart, slug: "welfare", bg: "bg-pink-100", color: "text-pink-500" },
    { name: "গাড়ি ভাড়া", icon: Car, slug: "car-rent", bg: "bg-green-100", color: "text-green-500" },

    { name: "কুরিয়ার", icon: Truck, slug: "courier", bg: "bg-sky-100", color: "text-sky-500" },
    { name: "থানা-পুলিশ", icon: Shield, slug: "police", bg: "bg-indigo-100", color: "text-indigo-500" },
    { name: "পৌর সেবা", icon: Building2, slug: "city-service", bg: "bg-orange-100", color: "text-orange-500" },
    { name: "বিদ্যুৎ অফিস", icon: Zap, slug: "electric", bg: "bg-yellow-100", color: "text-yellow-500" },

    { name: "মিস্ত্রি", icon: Wrench, slug: "mistri", bg: "bg-gray-200", color: "text-gray-700" },
    { name: "জরুরি সেবা", icon: Headphones, slug: "emergency", bg: "bg-red-100", color: "text-red-600" },
    { name: "চাকরি", icon: Search, slug: "jobs", bg: "bg-blue-100", color: "text-blue-600" },
    { name: "উদ্যোক্তা", icon: DollarSign, slug: "business", bg: "bg-green-100", color: "text-green-600" },

    { name: "শিক্ষক", icon: GraduationCap, slug: "teacher", bg: "bg-purple-100", color: "text-purple-500" },
    { name: "হোটেল", icon: Hotel, slug: "hotel", bg: "bg-amber-100", color: "text-amber-500" },
    { name: "রেস্টুরেন্ট", icon: Utensils, slug: "restaurant", bg: "bg-rose-100", color: "text-rose-500" },
    { name: "ফ্যাক্টরি ও জমি", icon: Factory, slug: "factory-land", bg: "bg-cyan-100", color: "text-cyan-600" },
];
