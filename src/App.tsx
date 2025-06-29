import React, { useState, useEffect } from 'react';
import { 
  Cross, 
  Heart, 
  Book, 
  Users, 
  Clock, 
  Menu, 
  X,
  ChevronRight,
  Globe,
  Scroll
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'definition', 'history', 'elements', 'theology', 'symbols', 'prayers', 'resources'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'definition', label: 'Definición' },
    { id: 'history', label: 'Historia' },
    { id: 'elements', label: 'Elementos' },
    { id: 'theology', label: 'Teología' },
    { id: 'symbols', label: 'Símbolos' },
    { id: 'prayers', label: 'Oraciones' },
    { id: 'resources', label: 'Recursos' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Cross className="w-6 h-6 text-gray-900" />
              <span className="text-lg font-medium text-gray-900">Eucaristía</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Cross className="w-12 h-12 text-gray-900 mx-auto mb-8" />
          
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
            La Eucaristía
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
            "Yo soy el pan vivo que ha bajado del cielo"
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-light">
            Sacramento central de la fe católica
          </p>
          
          <button
            onClick={() => scrollToSection('definition')}
            className="inline-flex items-center space-x-2 text-gray-900 border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <span className="font-medium">Explorar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Definition Section */}
      <section id="definition" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Definición</h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              La Eucaristía es el sacramento instituido por Jesucristo en la Última Cena
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Heart className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Sacramento Central</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Fuente y cumbre de toda la vida cristiana, donde Cristo se hace presente bajo las especies del pan y del vino.
              </p>
            </div>

            <div className="text-center">
              <Cross className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Presencia Real</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Cristo está verdaderamente presente bajo las apariencias del pan y del vino. No es solo un símbolo.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Comunión</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Nos une en comunión con Cristo y entre nosotros como miembros del Cuerpo de Cristo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Historia</h2>
            <p className="text-xl text-gray-600 font-light">
              Desde la Última Cena hasta nuestros días
            </p>
          </div>

          <div className="space-y-16">
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0 w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-medium">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">La Última Cena</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-4">
                  Jesús instituyó la Eucaristía durante la Última Cena con sus apóstoles, tomando pan y vino y diciendo: 
                  "Esto es mi cuerpo... Esta es mi sangre". Les mandó hacerlo en memoria suya.
                </p>
                <blockquote className="border-l-2 border-gray-300 pl-6 italic text-gray-500 font-light">
                  "Haced esto en conmemoración mía" - Lucas 22:19
                </blockquote>
              </div>
            </div>

            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0 w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-medium">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">La Iglesia Primitiva</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-4">
                  Los primeros cristianos celebraban la "fracción del pan" siguiendo el mandato de Jesús. 
                  San Pablo describe esta práctica en sus cartas.
                </p>
                <blockquote className="border-l-2 border-gray-300 pl-6 italic text-gray-500 font-light">
                  "Porque yo recibí del Señor lo que os he enseñado" - 1 Corintios 11:23
                </blockquote>
              </div>
            </div>

            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0 w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-medium">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Desarrollo Litúrgico</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  A lo largo de los siglos, la celebración eucarística se desarrolló en diferentes tradiciones litúrgicas, 
                  manteniendo siempre los elementos esenciales establecidos por Cristo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elements Section */}
      <section id="elements" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Elementos de la Misa</h2>
            <p className="text-xl text-gray-600 font-light">
              Las partes principales de la celebración eucarística
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-8">Liturgia de la Palabra</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Primera Lectura</h4>
                    <p className="text-gray-600 text-sm font-light">Generalmente del Antiguo Testamento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Salmo Responsorial</h4>
                    <p className="text-gray-600 text-sm font-light">Respuesta meditativa a la primera lectura</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Segunda Lectura</h4>
                    <p className="text-gray-600 text-sm font-light">De las cartas apostólicas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Cross className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Evangelio</h4>
                    <p className="text-gray-600 text-sm font-light">La culminación de la Liturgia de la Palabra</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-8">Liturgia Eucarística</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Presentación de las Ofrendas</h4>
                    <p className="text-gray-600 text-sm font-light">Pan, vino y ofrendas de los fieles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Plegaria Eucarística</h4>
                    <p className="text-gray-600 text-sm font-light">Consagración del pan y del vino</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-700 text-xs font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Padre Nuestro</h4>
                    <p className="text-gray-600 text-sm font-light">La oración que nos enseñó Jesús</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Comunión</h4>
                    <p className="text-gray-600 text-sm font-light">Recepción del Cuerpo y Sangre de Cristo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theology Section */}
      <section id="theology" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Significado Teológico</h2>
            <p className="text-xl text-gray-600 font-light">
              El misterio profundo de la Eucaristía en la fe católica
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <Cross className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Sacrificio</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                La Eucaristía actualiza de manera incruenta el sacrificio de Cristo en la cruz. 
                Es el mismo sacrificio, no una repetición.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Comunión</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Es el banquete sagrado donde recibimos a Cristo como alimento espiritual, 
                uniéndonos íntimamente con Él.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Presencia</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Cristo está verdadera, real y sustancialmente presente bajo las especies 
                eucarísticas.
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-12">Efectos de la Eucaristía</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-5 h-5 text-gray-900" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Gracia Santificante</h4>
                <p className="text-sm text-gray-600 font-light">Aumenta la vida divina en el alma</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-5 h-5 text-gray-900" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Unión con Cristo</h4>
                <p className="text-sm text-gray-600 font-light">Estrecha nuestra relación personal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cross className="w-5 h-5 text-gray-900" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Perdón de Pecados</h4>
                <p className="text-sm text-gray-600 font-light">Borra los pecados veniales</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-5 h-5 text-gray-900" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Vida Eterna</h4>
                <p className="text-sm text-gray-600 font-light">Garantía de resurrección</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symbols Section */}
      <section id="symbols" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Símbolos Eucarísticos</h2>
            <p className="text-xl text-gray-600 font-light">
              Los signos sagrados que nos ayudan a comprender el misterio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-6 h-6 bg-gray-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Pan</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Símbolo del alimento básico, representa a Cristo como el pan de vida que sostiene 
                nuestra existencia espiritual.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Vino</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Representa la sangre de Cristo derramada por nosotros. Es símbolo de alegría 
                y de la nueva alianza.
              </p>
            </div>

            <div className="text-center">
              <Cross className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Cruz</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                El símbolo central del cristianismo, presente en cada Eucaristía como recordatorio 
                del sacrificio redentor.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Asamblea</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                La comunidad reunida representa el Cuerpo de Cristo, unida en la celebración 
                del misterio eucarístico.
              </p>
            </div>

            <div className="text-center">
              <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Luz</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Las velas representan a Cristo como luz del mundo, 
                que ilumina las tinieblas del pecado.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-4">Corazón</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Símbolo del amor infinito de Cristo, que se entrega completamente 
                en cada Eucaristía.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayers Section */}
      <section id="prayers" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Oraciones Eucarísticas</h2>
            <p className="text-xl text-gray-600 font-light">
              Oraciones tradicionales para antes y después de la comunión
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-8 text-center">Antes de la Comunión</h3>
              
              <div className="space-y-8">
                <div className="border-l-2 border-gray-300 pl-6">
                  <h4 className="font-medium text-gray-900 mb-3">Oración de Preparación</h4>
                  <p className="text-gray-600 italic leading-relaxed font-light">
                    "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará 
                    para sanarme. Prepara mi corazón para reciberte con fe, esperanza y caridad."
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-6">
                  <h4 className="font-medium text-gray-900 mb-3">Acto de Fe</h4>
                  <p className="text-gray-600 italic leading-relaxed font-light">
                    "Señor mío Jesucristo, creo firmemente que estás presente en este Sacramento, 
                    verdadero Dios y verdadero hombre."
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-8 text-center">Después de la Comunión</h3>
              
              <div className="space-y-8">
                <div className="border-l-2 border-gray-300 pl-6">
                  <h4 className="font-medium text-gray-900 mb-3">Acción de Gracias</h4>
                  <p className="text-gray-600 italic leading-relaxed font-light">
                    "Te doy gracias, Señor Jesucristo, por haberme alimentado con tu Cuerpo y Sangre. 
                    Que esta comunión sea para mí fuente de vida eterna."
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-6">
                  <h4 className="font-medium text-gray-900 mb-3">Ofrenda Personal</h4>
                  <p className="text-gray-600 italic leading-relaxed font-light">
                    "Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Sangre de Cristo, embriágame. 
                    Dentro de tus llagas, escóndeme."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-medium text-gray-900 mb-8">Plegaria Universal</h3>
            <blockquote className="text-xl italic text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              "Oh Dios, que en este Sacramento admirable nos dejaste el memorial de tu Pasión, 
              te pedimos nos concedas venerar de tal modo los sagrados misterios de tu Cuerpo y de tu Sangre, 
              que experimentemos constantemente en nosotros el fruto de tu redención."
            </blockquote>
            <p className="text-gray-500 mt-6 font-light">- Oración de Santo Tomás de Aquino -</p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Recursos Adicionales</h2>
            <p className="text-xl text-gray-600 font-light">
              Materiales para profundizar en el conocimiento de la Eucaristía
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Book className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-6">Documentos Oficiales</h3>
              <ul className="space-y-3 text-gray-600 font-light">
                <li>Catecismo de la Iglesia Católica</li>
                <li>Concilio Vaticano II</li>
                <li>Encíclica Ecclesia de Eucharistia</li>
                <li>Instrucción General del Misal</li>
              </ul>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-6">Santos Eucarísticos</h3>
              <ul className="space-y-3 text-gray-600 font-light">
                <li>Santo Tomás de Aquino</li>
                <li>San Tarsicio</li>
                <li>Santa Juliana de Cornillon</li>
                <li>San Juan María Vianney</li>
                <li>Santa Teresa de Ávila</li>
              </ul>
            </div>

            <div className="text-center">
              <Heart className="w-8 h-8 text-gray-900 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-6">Devociones</h3>
              <ul className="space-y-3 text-gray-600 font-light">
                <li>Adoración Eucarística</li>
                <li>Corpus Christi</li>
                <li>Hora Santa</li>
                <li>Primera Comunión</li>
                <li>Comunión espiritual</li>
              </ul>
            </div>
          </div>

          <div className="mt-20 text-center border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-medium text-gray-900 mb-6">¿Deseas profundizar más?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-light">
              La Eucaristía es un misterio inagotable. Te invitamos a continuar tu formación 
              espiritual y teológica sobre este sacramento central de nuestra fe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-light">
                Catequesis parroquial
              </span>
              <span className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-light">
                Lecturas espirituales
              </span>
              <span className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-light">
                Adoración Eucarística
              </span>
              <span className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-light">
                Dirección espiritual
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Cross className="w-8 h-8 text-white mx-auto mb-6" />
            <h3 className="text-xl font-medium mb-6">Eucaristía</h3>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-light">
              "El que come mi carne y bebe mi sangre, tiene vida eterna, y yo le resucitaré en el último día"
            </p>
            <p className="text-sm text-gray-400 font-light">Juan 6:54</p>
            
            <div className="border-t border-gray-700 mt-12 pt-8">
              <p className="text-gray-400 text-sm font-light">
                Desarrollado con devoción para la gloria de Dios • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;