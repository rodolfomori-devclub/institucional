import Link from 'next/link'

export default function CTASection() {
  return (
    <section id="matricule-se" className="py-20 bg-primary-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Junte-se a milhares de alunos que já mudaram suas vidas através da programação. 
            Vagas limitadas para a próxima turma!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/formacoes"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Escolher minha formação
            </Link>
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as formações do DevClub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors duration-200"
            >
              Falar com consultor
            </a>
          </div>
          <p className="mt-8 text-sm text-primary-200">
            * Ofertas especiais para matrículas antecipadas. Consulte condições.
          </p>
        </div>
      </div>
    </section>
  )
}