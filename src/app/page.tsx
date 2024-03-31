import { inter, poppins, lusitana } from "@/app/ui/fonts";
import HeroSection from "@/components/heroSection";
export default function Home() {
  return (
    <>
    <HeroSection />
    <div className="w-10">
      <p className={`${inter.className} antialiased`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dolorem aliquam ab harum iste eos, dolore ducimus placeat dignissimos animi repudiandae, autem doloremque iure atque? Nesciunt rem consectetur eligendi exercitationem!</p>
      <p className={`${poppins.className} antialiased`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dolorem aliquam ab harum iste eos, dolore ducimus placeat dignissimos animi repudiandae, autem doloremque iure atque? Nesciunt rem consectetur eligendi exercitationem!</p>
      <p className={`${lusitana.className} antialiased`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dolorem aliquam ab harum iste eos, dolore ducimus placeat dignissimos animi repudiandae, autem doloremque iure atque? Nesciunt rem consectetur eligendi exercitationem!</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dolorem aliquam ab harum iste eos, dolore ducimus placeat dignissimos animi repudiandae, autem doloremque iure atque? Nesciunt rem consectetur eligendi exercitationem!</p>
    </div>
    </>
  );
}
