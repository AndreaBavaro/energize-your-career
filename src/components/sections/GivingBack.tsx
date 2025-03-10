import { Heart } from 'lucide-react';

export default function GivingBack() {
  return (
    <section id="giving-back" className="py-24 white-brick-bg relative">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
            <Heart className="h-8 w-8 text-voltify-900" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900">Voltify Gives Back</h2>
          <p className="text-lg text-stone-600">Making a positive impact in our communities.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-xl mb-6 text-stone-700">
            5% of each permanent placement fee is donated to charitable organizations and food banks.
          </p>
          <p className="text-stone-600">
            A copy of the donation receipt is provided to the designated client for complete transparency. Together, we're making a difference beyond the workplace.
          </p>
        </div>
      </div>
    </section>
  );
}
