import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Presentation, 
  Banknote, 
  Coins, 
  FileCheck2, 
  Smile, 
  Globe2, 
  CheckSquare, 
  Settings 
} from 'lucide-react';

export default function JoinUs() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: <GraduationCap className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_0_title'),
      description: t('joinUs.features_0_desc')
    },
    {
      icon: <Presentation className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_1_title'),
      description: t('joinUs.features_1_desc')
    },
    {
      icon: <Banknote className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_2_title'),
      description: t('joinUs.features_2_desc')
    },
    {
      icon: <Coins className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_3_title'),
      description: t('joinUs.features_3_desc')
    },
    {
      icon: <FileCheck2 className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_4_title'),
      description: t('joinUs.features_4_desc')
    },
    {
      icon: <Smile className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_5_title'),
      description: t('joinUs.features_5_desc')
    },
    {
      icon: <Globe2 className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_6_title'),
      description: t('joinUs.features_6_desc')
    },
    {
      icon: <CheckSquare className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_7_title'),
      description: t('joinUs.features_7_desc')
    },
    {
      icon: <Settings className="w-12 h-12 text-yellow-500" />,
      title: t('joinUs.features_8_title'),
      description: t('joinUs.features_8_desc')
    }
  ];

  const requirements = [
    { title: t('joinUs.requirements_0_title'), desc: t('joinUs.requirements_0_desc') },
    { title: t('joinUs.requirements_1_title'), desc: t('joinUs.requirements_1_desc') },
    { title: t('joinUs.requirements_2_title'), desc: t('joinUs.requirements_2_desc') },
    { title: t('joinUs.requirements_3_title'), desc: t('joinUs.requirements_3_desc') },
    { title: t('joinUs.requirements_4_title'), desc: t('joinUs.requirements_4_desc') },
    { title: t('joinUs.requirements_5_title'), desc: t('joinUs.requirements_5_desc') },
    { title: t('joinUs.requirements_6_title'), desc: t('joinUs.requirements_6_desc') },
    { title: t('joinUs.requirements_7_title'), desc: t('joinUs.requirements_7_desc') },
    { title: t('joinUs.requirements_8_title'), desc: t('joinUs.requirements_8_desc') },
    { title: t('joinUs.requirements_9_title'), desc: t('joinUs.requirements_9_desc') }
  ];

  return (
    <div className="w-full bg-slate-50 font-sans" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative w-full h-150 flex items-center justify-center bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-white/40" />
        
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-10 md:p-14 rounded-lg shadow-xl text-center max-w-3xl mx-4 border border-white/50">
          <h1 className="text-3xl md:text-5xl font-bold text-teal-800 mb-6 leading-tight">
            {t('joinUs.heroTitle')}
          </h1>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 font-medium">
            {t('joinUs.heroDesc').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
            <button onClick={() => navigate('/supervisor-application')} className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-10 rounded transition duration-300 text-xl cursor-pointer">
              {t('joinUs.supervisorApply')}
            </button>
             <button onClick={() => navigate('/teacher-application')} className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-10 rounded transition duration-300 text-xl mx-3 cursor-pointer">
              {t('joinUs.teacherApply')}
            </button>
         
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-center mb-16 relative">
          <div className="bg-white shadow-md rounded-lg py-4 px-8 flex flex-col items-center border-b-4 border-yellow-500 z-10 transform -translate-y-28 md:-translate-y-32">
            <div className="bg-yellow-400 p-2 rounded-full mb-3">
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-teal-800">{t('joinUs.featuresTitle')}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-30">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-6 bg-yellow-50 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-800 text-center mb-12">{t('joinUs.requirementsTitle')}</h2>
          
          <div className="space-y-6 text-gray-700 text-lg">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-start">
                <span className="font-bold ml-2 shrink-0">{index + 1}-</span>
                <p>
                  <span className="font-bold text-gray-900">{req.title}</span> {req.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">{t('joinUs.applyTitle')}</h2>
            <p className="text-xl text-gray-800 mb-8 font-medium">
              {t('joinUs.applyDesc').split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button onClick={() => navigate('/supervisor-application')} className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-10 rounded transition duration-300 text-xl cursor-pointer">
              {t('joinUs.supervisorApply')}
            </button>
             <button onClick={() => navigate('/teacher-application')} className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-10 rounded transition duration-300 text-xl mx-3 cursor-pointer">
              {t('joinUs.teacherApply')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
