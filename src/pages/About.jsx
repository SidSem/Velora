import { Link } from 'react-router-dom'
import { ArrowRight, Feather, Shield, Compass, Sparkles } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 space-y-24 sm:space-y-32">
      <div>
        <Breadcrumbs items={[{ label: 'Our Story' }]} />

        {/* Hero Section */}
        <div className="pt-8 sm:pt-14 pb-12 max-w-4xl">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-3">
            Atelier Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase leading-[1.08] tracking-tight mb-8">
            Our Story
          </h1>
          <p className="font-serif text-2xl sm:text-3xl font-light text-[#555555] dark:text-[#CCCCCC] leading-snug">
            “VELORA was created around the belief that great design does not need to shout.”
          </p>
        </div>

        {/* Large Editorial Hero Image */}
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#161616]">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop"
            alt="VELORA Atelier craft"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Brand Philosophy Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E]">
            Founded 2024
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal leading-tight">
            The Power of Restraint
          </h2>
          <p className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed">
            In an industry obsessed with relentless novelty, VELORA offers an antidote: a permanent wardrobe of architectural essentials.
          </p>
          <p className="text-sm text-[#777777] dark:text-[#999999] leading-relaxed">
            We began with a single linen shirt cut with oversized proportions, seeking the exact equilibrium between structural poise and effortless ease. Today, that same dedication informs every tailored trouser, cocoon coat, and cashmere knit we create.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-3">
            <Feather className="w-6 h-6 text-[#B89B5E]" />
            <h3 className="font-serif text-xl uppercase">Pure Mono-Fibers</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              We insist on 100% natural fibers: French Normandy linen, grade 6A mulberry silk, and Mongolian cashmere without chemical blends.
            </p>
          </div>

          <div className="p-8 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-3">
            <Shield className="w-6 h-6 text-[#B89B5E]" />
            <h3 className="font-serif text-xl uppercase">Architectural Fit</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Silhouettes are engineered from three-dimensional draping rather than flat paper patterns, flattering natural posture.
            </p>
          </div>

          <div className="p-8 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-3">
            <Compass className="w-6 h-6 text-[#B89B5E]" />
            <h3 className="font-serif text-xl uppercase">Transparent Origins</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Each piece links back to family-run Italian weaving mills and Japanese denim looms preserving historical mastery.
            </p>
          </div>

          <div className="p-8 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-3">
            <Sparkles className="w-6 h-6 text-[#B89B5E]" />
            <h3 className="font-serif text-xl uppercase">Limited Editions</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Zero overproduction. We craft small serialized batches that honor the artisans who sew them.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craftsmanship" className="border-t border-[#E5E1D8] dark:border-[#2C2C2C] pt-20">
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-2">
            The Atelier Process
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl uppercase font-normal tracking-tight">
            Craftsmanship & Materials
          </h2>
          <p className="text-sm sm:text-base text-[#666666] dark:text-[#AAAAAA] mt-3 leading-relaxed">
            A garment’s character is determined by decisions invisible to the naked eye: how a seam is pressed, the tension of needle threads, and the origin of horn buttons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#EAE6DD] dark:bg-[#1E1E1E] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
                alt="Cashmere knitwear"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl uppercase">Mongolian Cashmere</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Sourced from free-roaming Capra hircus goats in the high steppes, combed gently during spring molting to preserve 15-micron softness.
            </p>
          </div>

          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#EAE6DD] dark:bg-[#1E1E1E] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop"
                alt="Normandy linen"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl uppercase">Normandy Flax Linen</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Dew-retted along the damp coast of northern France. Naturally temperature-regulating with a structured, sculptural drape.
            </p>
          </div>

          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#EAE6DD] dark:bg-[#1E1E1E] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
                alt="Japanese selvedge denim"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl uppercase">Japanese Kurabo Selvedge</h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              Slowly shuttle-loomed in Okayama on vintage Toyoda looms. Rigid, unwashed cotton that conforms uniquely to the wearer’s life.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="border-t border-[#E5E1D8] dark:border-[#2C2C2C] pt-20 pb-12">
        <div className="bg-[#EFECE4] dark:bg-[#181818] p-8 sm:p-16 border border-[#E5E1D8] dark:border-[#2C2C2C] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#4F7A5A]">
              Ecological Stewardship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal leading-tight">
              Designed For Generations, Not Seasons
            </h2>
            <p className="text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed">
              The single most sustainable garment is the one you wear for fifteen years. By refusing planned obsolescence and fast-fashion cycle churn, VELORA minimizes footprint through longevity.
            </p>
            <ul className="text-xs text-[#666666] dark:text-[#BBBBBB] space-y-2.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7A5A]" />
                100% biodegradable and compostable mono-fiber garment bodies
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7A5A]" />
                Recycled paper packaging and reusable organic cotton dust bags
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7A5A]" />
                100% Carbon-neutral worldwide transit through certified offsets
              </li>
            </ul>
          </div>

          <div className="text-center p-8 bg-white/60 dark:bg-black/40 border border-[#E5E1D8] dark:border-[#333333] space-y-4">
            <h3 className="font-serif text-2xl uppercase">Experience The Atelier</h3>
            <p className="text-xs text-[#777777] dark:text-[#999999] max-w-sm mx-auto">
              Explore the pieces that exemplify our standard of minimalist luxury.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
