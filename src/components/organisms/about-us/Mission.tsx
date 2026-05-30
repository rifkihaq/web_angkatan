import React from 'react'

const Mission = () => {
  return (
    <section className="text-center py-16 px-4 relative w-full flex flex-col items-center mt-12 md:mt-20">
      <h2 className="text-4xl md:text-5xl font-rubikone text-white mb-8 z-10 relative">
        Our Mision
      </h2>
      
      <div className="max-w-4xl mx-auto text-white text-base md:text-xl leading-relaxed space-y-6 z-10 relative">
        <p>
          Membangun lingkungan yang <span className="text-yellow-cs-20 font-bold">inklusif</span> dan{' '}
          <span className="text-yellow-cs-20 font-bold">supportif</span> berlandaskan{' '}
          <span className="text-yellow-cs-20 font-bold">rasa kepedulian</span>
        </p>
        
        <p>
          Memberikan wadah <span className="text-yellow-cs-20 font-bold">kolaborasi</span> dan{' '}
          <span className="text-yellow-cs-20 font-bold">eksplorasi</span> untuk mengembangkan{' '}
          <span className="text-yellow-cs-20 font-bold">potensi setiap</span> individu sehingga mampu memberikan{' '}
          <span className="text-yellow-cs-20 font-bold">dampak positif</span>
        </p>
      </div>
    </section>
  )
}

export default Mission
