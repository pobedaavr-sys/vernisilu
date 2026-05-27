/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Menu, X, ArrowRight, Check, Send, Users, Sparkles, Flame, Wind, Mountain, ChevronRight } from 'lucide-react';

// Constants
const IMAGES = {
  temazcal: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1fbd5ce91c5ac7029a8dbf7c0d61bd466993047a/%D0%A2%D0%95%D0%9C%D0%9O%D0%A1%D0%9A%D0%90%D0%9B%D0%AC.jpg",
  nature: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1de949d7d59e8de005cc1f1f2bfbe808280ba6d0/%D0%B2%D0%BC%D0%B5%D1%81%D1%82%D0%BE_%D0%B3%D1%80%D0%B8%D0%B1%D0%BE%D1%87%D0%BA%D0%B0.jpg",
  paints: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1fbd5ce91c5ac7029a8dbf7c0d61bd466993047a/%D0%BA%D1%80%D0%B0%D1%81%D0%BA%D0%B8.jpg",
  fire: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1de949d7d59e8de005cc1f1f2bfbe808280ba6d0/hero.jpg",
  july3: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1fbd5ce91c5ac7029a8dbf7c0d61bd466993047a/3%20%D0%B8%D1%8E%D0%BB%D1%8F%202026.jpg",
  july4: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1fbd5ce91c5ac7029a8dbf7c0d61bd466993047a/%D0%A2%D0%95%D0%9C%D0%9E%D0%A1%D0%9A%D0%90%D0%9B%D0%AC.jpg",
  rod: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1de949d7d59e8de005cc1f1f2bfbe808280ba6d0/%D1%80%D0%BE%D0%B4_%D1%80%D0%BE%D0%B4.jpg",
  elena: "https://raw.githubusercontent.com/pobedaavr-sys/foto/1fbd5ce91c5ac7029a8dbf7c0d61bd466993047a/%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%9C%D0%B8%D0%BB%D1%8C%D0%BA%D0%B5%D0%B2%D0%B8%D1%87.jpg",
};

const TG_LINK = "https://t.me/NastiaRaduga";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Components
const SectionHeading = ({ label, title, subtitle, centered = false, light = true }: { label: string, title: string, subtitle?: string, centered?: boolean, light?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center mx-auto' : ''}`}>
    <span className={`${light ? 'text-text-muted' : 'text-zinc-400'} uppercase tracking-[0.2em] text-[11px] font-bold block mb-4`}>{label}</span>
    <h2 className={`text-4xl md:text-5xl lg:text-7xl mb-6 ${light ? 'text-zinc-950' : 'text-white'}`}>{title}</h2>
    {subtitle && <p className={`${light ? 'text-text-secondary' : 'text-zinc-300'} text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} leading-relaxed font-light`}>{subtitle}</p>}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [mindExpanded, setMindExpanded] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [rodExpanded, setRodExpanded] = useState(false);
  
  // Hero Animation Values
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  };

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToFormats = () => {
    document.getElementById('formats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-main">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg py-4 border-b border-border-beige' : 'bg-transparent py-8'}`}>
        <div className="editorial-layout flex justify-between items-center text-zinc-950">
          <div className="text-lg font-semibold tracking-tight uppercase">«Исцеление силой любви»</div>
          
          <nav className="hidden md:flex items-center gap-12">
            {['Программа', 'Практики', 'Проводник', 'Форматы', 'Участие'].map((item) => (
              <a 
                key={item} 
                href={`#${item === 'Форматы' ? 'formats' : item.toLowerCase()}`} 
                onClick={handleSmoothScroll}
                className="text-[11px] text-text-secondary hover:text-brand-accent transition-colors uppercase tracking-[0.15em] font-bold"
              >
                {item}
              </a>
            ))}
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col pt-32"
          >
            <button className="absolute top-8 right-8 text-zinc-950" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-3xl font-light text-zinc-950">
              {['Программа', 'Практики', 'Проводник', 'Форматы', 'Участие'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item === 'Форматы' ? 'formats' : item.toLowerCase()}`} 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleSmoothScroll(e);
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center pt-24 md:pt-0 bg-bg-light overflow-hidden">
        <div className="editorial-layout grid lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-xl z-10"
          >
            <span className="text-brand-accent uppercase tracking-[0.25em] text-[11px] font-bold mb-8 block">
              3–5 июля 2026 · Гатчинский район
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-medium leading-[1.05] tracking-tighter text-zinc-950">
              Верни себе свою силу
            </h1>
            <h2 className="text-2xl md:text-3xl text-text-secondary mb-10 font-light italic leading-snug">
              «Исцеление силой любви»
            </h2>
            <p className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed font-light">
              Женская выездная программа в тишине Ленинградской области. Три дня практик через Ум, Тело и Род — для возвращения к себе, внутренней опоре и ясности.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-12">
              {['3 дня погружения', 'камерный круг до 20 человек', 'практики Ум · Тело · Род', 'без лишнего шума и оценок'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
                  <span className="text-sm text-text-muted font-medium tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={scrollToFormats}
              className="bg-zinc-950 text-white px-12 py-5 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-accent transition-all duration-300 soft-shadow"
            >
              Выбрать формат участия
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onMouseMove={handleHeroMouseMove}
            style={{ 
              rotateX, 
              rotateY,
              perspective: 1000 
            }}
            className="relative h-[500px] lg:h-[750px] w-full group cursor-pointer"
          >
            <motion.div 
              style={{ scale: heroScale, opacity: heroOpacity, x: translateX, y: translateY }}
              className="w-full h-full"
            >
              <img src={IMAGES.fire} alt="Fire" className="w-full h-full object-cover rounded-[320px] rounded-tl-[40px] rounded-br-[40px] shadow-2xl transition-all duration-1000 group-hover:rounded-[40px]" />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-2xl shadow-2xl hidden lg:block border border-border-beige z-20">
               <p className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-2">Гатчинский район</p>
               <p className="text-2xl font-light italic text-zinc-950">Три дня пути через<br/>Ум, Тело и Род</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOCK 3: STATE */}
      <section className="py-32 bg-white" id="программа">
        <div className="editorial-layout">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <SectionHeading 
                label="Контекст"
                title="Когда старые опоры уже не держат"
                subtitle="Иногда внешне всё выглядит собранно: дела, обязанности, контроль. Но внутри может нарастать тревога, усталость и ощущение, что прежние способы жить больше не дают опоры."
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'тревога и усталость стали фоном',
                  'старые решения больше не работают',
                  'хочется тишины и ясности',
                  'поддержка без оценок',
                  'пора вернуться к себе',
                  'желание живого проживания'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-bg-light border border-border-beige transition-all hover:bg-bg-warm">
                    <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-1">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="pt-12">
                <img src={IMAGES.nature} alt="Nature" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-lg" />
              </div>
              <div className="pb-12">
                <img src={IMAGES.paints} alt="Paints" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4: STRUCTURE */}
      <section className="py-32 bg-bg-light">
        <div className="editorial-layout">
          <SectionHeading 
            centered
            label="Путь"
            title="Три дня. Три слоя. Один путь."
            subtitle="Программа построена как последовательное прохождение трёх уровней. Каждый день имеет свою задачу и своё пространство работы."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { date: '3 июля', layer: 'УМ', title: 'Игра «7 Печатей»', text: 'Работа с личным запросом, связью событий, состояний, ресурсов и препятствий.', img: IMAGES.july3 },
              { date: '4 июля', layer: 'ТЕЛО', title: 'ТЕМАСКАЛЬ', text: 'ЦЕРЕМОНИЯ ПЕРВОГО ВДОХА. Пространство жара, темноты и обновления.', img: IMAGES.july4 },
              { date: '4–5 июля', layer: 'РОД', title: 'САКРАЛЬНАЯ НОЧЬ', text: 'Закрытый женский круг, молитвы и исцеление межпоколенческих травм.', img: IMAGES.rod }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[32px] overflow-hidden border border-border-beige soft-shadow group"
              >
                <div className="h-64 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest">{item.date}</span>
                    <span className="w-1 h-1 bg-border-beige rounded-full" />
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">{item.layer}</span>
                  </div>
                  <h3 className="text-2xl mb-4 font-medium">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="inline-block px-8 py-4 bg-white border border-border-beige rounded-full text-sm italic text-text-secondary">
              Важно: на ночную церемонию можно попасть только после Темаскаля.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 5: LAYER MIND */}
      <section className="py-32 bg-white" id="практики">
        <div className="editorial-layout">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img src={IMAGES.july3} alt="Mind Layer" className="w-full h-[600px] object-cover rounded-[32px]" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading 
                label="Первый слой"
                title="СЛОЙ: УМ"
              />
              <h3 className="text-3xl mb-8 font-light italic">Игра «7 Печатей»</h3>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed font-light">
                В игру участница входит со своим запросом. Поле игры помогает увидеть, где застряла энергия решения и какой следующий шаг может быть реальным.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <ul className="space-y-4">
                  {['6-часовое погружение', 'Поиск ресурсов', 'Ясность по ситуации', '30 мин консультации'].map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-text-main font-medium">
                      <ArrowRight className="w-3 h-3 text-brand-accent" /> {li}
                    </li>
                  ))}
                </ul>
                <div className="bg-bg-light p-8 rounded-2xl border border-border-beige">
                  <p className="text-xs uppercase tracking-widest text-text-muted font-bold mb-4">Формат</p>
                  <p className="text-sm font-semibold">Дата: 3 июля 2026</p>
                  <p className="text-sm font-semibold">Группа: до 6 человек</p>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setMindExpanded(!mindExpanded)}
                  aria-expanded={mindExpanded}
                  aria-controls="mind-detailed-desc"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#e7dfd4] hover:border-zinc-500 rounded-full text-xs uppercase tracking-[0.15em] font-bold text-zinc-800 transition-all duration-300 hover:bg-bg-warm"
                >
                  <span>{mindExpanded ? 'Свернуть описание' : 'Подробнее об игре «7 Печатей»'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${mindExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mindExpanded && (
              <motion.div
                id="mind-detailed-desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden mt-8"
              >
                <div className="p-8 md:p-12 bg-[#f8f7f4] border border-[#e7dfd4] rounded-[24px]">
                  <h4 className="text-2xl md:text-3xl text-zinc-950 font-medium mb-8">О игре «7 Печатей»</h4>
                  
                  <p className="text-base text-[#3a3530] font-light leading-relaxed mb-10 max-w-3xl">
                    Жизнь и каждое событие можно рассматривать как игру энергий, в которую вовлечено сознание. Игра «7 Печатей» построена по законам движения энергии и сознания из древних источников мудрости.
                  </p>

                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm md:text-base leading-relaxed font-light text-[#4a4540]">
                    <div className="space-y-8">
                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Как проходит</h5>
                        <p>Участница входит в игру со своим запросом: ситуацией, внутренним выбором или вопросом, который давно требует ясности. В процессе проявляются связь событий с внутренним состоянием, причины дисгармонии, ресурсы, препятствия и возможные шаги к цели.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Поле игры и механика</h5>
                        <p>Поле игры символически отражает жизнь, а движение по нему помогает увидеть развитие событий. «7 Печатей» — это фильтры сознания, которые могут блокировать свободное движение энергии. Они связаны с мыслями, эмоциями, телом и внутренним состоянием.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Динамическая энергия</h5>
                        <p>В игре используются 22 энергии, связанные со старшими арканами Таро. Они помогают увидеть, какие силы участвуют в ситуации и какие ресурсы могут поддержать движение к цели.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Синхронизация</h5>
                        <p>По принципу синхронизации участнице выпадают поля и ситуации, значимые именно для её запроса. Каждая клетка становится образом ситуации, а движение по полю — способом увидеть, как может разворачиваться событие.</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Цель игры</h5>
                        <p>Цель игры — раскрыть печати сознания: переосмыслить ограничения, увидеть ситуацию с разных сторон, найти выход из трудного положения и выстроить связь между внутренним состоянием и внешними событиями.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Основа игры</h5>
                        <p>В основе игры соединяются психология, И-Цзин, сакральная геометрия, мудрость Египта и библейские образы из Откровения Иоанна Богослова.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Ваш запрос</h5>
                        <p>Вы входите в игру со своим намерением — тем, что давно не решается или требует более ясного взгляда. Запрос проходит через базовую матрицу жизни, помогает увидеть блоки и подключить ресурсы.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Особенность игры с ведущей</h5>
                        <p>Елена Милькевич сопровождает процесс как мастер. В работе она использует расстановочный подход, психотерапию, атмалогию, шаманские и эзотерические практики. Это помогает смотреть не только на внешнюю ситуацию, но и на её причинный уровень.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-zinc-950 mb-2">Результат в жизни</h5>
                        <p>Результат может проявляться индивидуально: у кого-то быстро, у кого-то постепенно. Чем глубже личная работа, тем дольше может разворачиваться новая внутренняя история.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* BLOCK 6: LAYER BODY - TEMAZCAL */}
      <section className="py-32 bg-dark-section overflow-hidden">
        <div className="editorial-layout px-6">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeIn}
             >
               <SectionHeading 
                 light={false}
                 label="Второй слой"
                 title="СЛОЙ: ТЕЛО"
               />
               <h3 className="text-3xl text-brand-accent mb-4 uppercase tracking-widest font-bold">ТЕМАСКАЛЬ</h3>
               <p className="text-xl text-zinc-300 italic font-light mb-10">ЦЕРЕМОНИЯ ПЕРВОГО ВДОХА</p>
               <div className="flex justify-start mb-10">
                 <button
                   type="button"
                   onClick={() => setBodyExpanded(!bodyExpanded)}
                   aria-expanded={bodyExpanded}
                   aria-controls="body-detailed-desc"
                   className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 hover:bg-zinc-900"
                 >
                   <span>{bodyExpanded ? 'Свернуть описание' : 'Подробнее о Темаскале'}</span>
                   <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${bodyExpanded ? 'rotate-90' : ''}`} />
                 </button>
               </div>
               <p className="text-zinc-400 text-lg leading-relaxed mb-12 font-light">
                 Ритуальная баня, «дом горячих камней». В полной темноте, под пение и ароматы трав, камни отдают жар воде, создавая целительный пар. Это пространство вне времени.
               </p>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: 'Восток', attr: 'Воздух' },
                   { label: 'Юг', attr: 'Огонь' },
                   { label: 'Запад', attr: 'Вода' },
                   { label: 'Север', attr: 'Земля' }
                 ].map((item, i) => (
                   <div key={i} className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                     <p className="text-[10px] uppercase text-brand-accent font-bold tracking-widest mb-1">{item.attr}</p>
                     <p className="text-white font-medium">{item.label}</p>
                   </div>
                 ))}
               </div>
             </motion.div>
             <div className="relative flex flex-col">
               <div className="w-full aspect-square lg:aspect-auto lg:h-[700px] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative">
                 <img 
                   src={IMAGES.july4} 
                   alt="4 июля 2026 · Церемония первого вдоха" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 -z-10">
                   <span className="text-zinc-600 font-bold tracking-widest text-sm uppercase">ТЕМАСКАЛЬ</span>
                 </div>
               </div>
               <p className="mt-6 text-zinc-500 text-sm italic font-light">4 июля 2026 · Церемония первого вдоха</p>
             </div>
           </div>
        </div>
      </section>

            <AnimatePresence initial={false}>
              {bodyExpanded && (
                <motion.div
                  id="body-detailed-desc"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden mt-12 text-zinc-900"
                >
                  <div className="p-8 md:p-12 bg-[#fdfcf9] border border-[#e7dfd4] rounded-[24px]">
                    <h4 className="text-2xl md:text-3xl text-zinc-950 font-medium mb-6">Что такое Темаскаль</h4>
                    
                    <div className="space-y-4 mb-8 text-base font-light text-zinc-700">
                      <p>
                        ТЕМАСКАЛЬ — ритуальная баня, «дом горячих камней». Это пространство жара, темноты, пара, песен и трав, где каждый вдох становится шагом к внутреннему обновлению.
                      </p>
                      <p>
                        В полной темноте раскалённые камни отдают жар воде, создавая целительный пар. Это пространство вне привычного времени, где можно остаться наедине со своей истинной сутью.
                      </p>
                    </div>

                    <div className="border-t border-[#e7dfd4] pt-8 mb-8">
                      <h5 className="text-xl text-zinc-950 font-medium mb-4">ЦЕРЕМОНИЯ ПЕРВОГО ВДОХА</h5>
                      <p className="text-base font-light text-zinc-700">
                        Церемония помогает пройти опыт закрытия старых программ и открытия новых. Участница выходит из пространства Темаскаля с ощущением нового дыхания, собранности и возвращения к телу.
                      </p>
                    </div>

                    <div className="border-t border-[#e7dfd4] pt-8 mb-8">
                      <h5 className="text-xl text-zinc-950 font-medium mb-6">Четыре пространства и стихии</h5>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { title: 'Восток (Воздух) — Намерение и Призыв', text: 'Мы формируем свой запрос и приглашаем Духов-наставников. Это момент сонастройки и открытия пространства.' },
                          { title: 'Юг (Огонь) — Просьба и Молитва', text: 'Время искреннего обращения к высшим силам о том, что действительно необходимо. Здесь участница заявляет о своих нуждах и просит об исцелении.' },
                          { title: 'Запад (Вода) — Трансформация и Исцеление', text: 'Самый жаркий и глубокий этап. Здесь старое сгорает, освобождая место для исцеления и перемен.' },
                          { title: 'Север (Земля) — Благодарность и Празднование', text: 'Обретение мудрости, тишины и заземления. Время благодарности жизни и празднования своего обновления.' }
                        ].map((card, idx) => (
                          <div key={idx} className="p-6 bg-[#f8f7f4] border border-[#e7dfd4] rounded-xl">
                            <h6 className="font-semibold text-zinc-950 text-sm mb-2">{card.title}</h6>
                            <p className="text-sm font-light text-zinc-700 leading-relaxed">{card.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[#e7dfd4] pt-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-lg text-zinc-950 font-semibold mb-3">Камни-Бабушки</h5>
                        <p className="text-sm md:text-base font-light text-zinc-700 leading-relaxed">
                          В центре церемонии — Камни-Бабушки. Раскалённые в огне, они пробуждают древнюю память о том, кто мы есть и как мы взаимосвязаны со всем существованием.
                        </p>
                      </div>
                      <div>
                        <h5 className="text-lg text-zinc-950 font-semibold mb-3">Польза для участников</h5>
                        <ul className="space-y-2 text-sm md:text-base font-light text-zinc-700">
                          {[
                            'глубокое очищение;',
                            'психологическая разгрузка;',
                            'снятие телесных зажимов;',
                            'восстановление энергетического баланса;',
                            'духовное обновление;',
                            'поиск ответов на внутренние вопросы;',
                            'ощущение единства с природой и жизнью.'
                          ].map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-brand-accent mt-1.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

{/* BLOCK 7: LAYER ANCESTORS */}
      <section className="py-32 bg-white" id="род">
        <div className="editorial-layout">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionHeading 
              centered
              label="Третий слой"
              title="СЛОЙ: РОД"
            />
            <h3 className="text-3xl mb-6 italic tracking-tight">САКРАЛЬНАЯ ЖЕНСКАЯ НОЧЬ</h3>
            <div className="flex justify-center mt-3 mb-6">
              <button
                type="button"
                onClick={() => setRodExpanded(!rodExpanded)}
                aria-expanded={rodExpanded}
                aria-controls="rod-detailed-desc"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 hover:border-zinc-500 text-zinc-600 hover:text-zinc-950 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 hover:bg-[#faf9f6]"
              >
                <span>{rodExpanded ? 'Свернуть описание' : 'Подробнее о Сакральной женской ночи'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${rodExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <p className="text-text-secondary text-lg leading-relaxed font-light">
              Закрытый женский круг, где можно обратиться к своим корням, женским историям и памяти тела. Это честное возвращение к своей силе и внутренней опоре.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 min-h-[500px]">
            <img src={IMAGES.rod} alt="Ancestors practice" className="w-full h-full object-cover rounded-3xl" />
            <div className="bg-bg-warm rounded-3xl p-16 flex flex-col justify-center items-start">
               <span className="text-brand-accent text-xs uppercase font-bold tracking-widest mb-6">Опыт проживания</span>
               <div className="space-y-6 text-2xl font-light text-zinc-800 italic leading-relaxed">
                 <p>— Вспомнить себя</p>
                 <p>— Восстановить связь с собой</p>
                 <p>— Исцелять женские травмы поколений</p>
                 <p>— Возвращаться к истинной сути</p>
               </div>
            </div>
          </div>
                    <AnimatePresence initial={false}>
              {rodExpanded && (
                <motion.div
                  id="rod-detailed-desc"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden mt-12 text-zinc-900"
                >
                  <div className="p-8 md:p-12 bg-[#fdfcf9] border border-[#e7dfd4] rounded-[24px]">
                    <h4 className="text-2xl md:text-3xl text-zinc-950 font-medium mb-6">Сакральный смысл практики</h4>
                    
                    <div className="space-y-4 mb-8 text-base font-light text-zinc-700">
                      <p>
                        Сакральная женская ночь — это пространство глубокой тишины, молитвы и обращения к корням. Это веками проверенный ритуал соучастия, соприкосновения и передачи силы, где каждая женщина может почувствовать себя частью великой цепи жизни.
                      </p>
                      <p>
                        Время, когда женщина может соединиться со своей глубинной женской силой, получить поддержку рода и освободиться от старых, отживших сценариев, которые больше не служат её развитию.
                      </p>
                    </div>

                    <div className="border-t border-[#e7dfd4] pt-8 mb-8">
                      <h5 className="text-xl text-zinc-950 font-medium mb-4">Этапы и опыт проживания</h5>
                      <p className="text-base font-light text-zinc-700 leading-relaxed">
                        Очищение через огонь и воду, создание безопасного пространства круга, сонастройка с естественными ритмами природы. Практика глубокого обращения к прародительницам рода, бережное восстановление прерванных межпоколенческих связей и получение благословения на счастливую долю.
                      </p>
                    </div>

                    <div className="border-t border-[#e7dfd4] pt-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-lg text-zinc-950 font-semibold mb-3">Соединение с Родом</h5>
                        <p className="text-sm md:text-base font-light text-zinc-700 leading-relaxed">
                          Через бережные медитативные и телесные практики мы воссоздаем контакт со своей семейной системой. Это помогает трансформировать накопленный поколениями опыт в мощный ресурс поддержки, любви и вдохновения.
                        </p>
                      </div>
                      <div>
                        <h5 className="text-lg text-zinc-950 font-semibold mb-3">Польза для участниц</h5>
                        <ul className="space-y-2 text-sm md:text-base font-light text-zinc-700">
                          {[
                            'обретение чувства защищенности и внутренней силы;',
                            'исцеление межпоколенческих травм;',
                            'раскрытие скрытого женского потенциала;',
                            'глубокое расслабление и устойчивый покой;',
                            'соединение с мудростью предков.'
                          ].map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-brand-accent mt-1.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </section>

       {/* BLOCK 10: PROVODNIK */}
      <section className="relative z-10 py-16 md:py-24 lg:py-32 bg-white overflow-hidden" id="проводник">
        <div className="editorial-layout px-6">
          <SectionHeading 
            label="ПРОВОДНИК ПРОГРАММЫ"
            title="Кто проводит практику"
            subtitle="Елена Милькевич — психолог и парапсихолог с более чем 20-летней практикой. Она соединяет современную психологию, расстановочный подход, атмалогию, шаманские традиции и опыт духовных практик."
          />

          <div className="grid lg:grid-cols-[45%_55%] gap-12 md:gap-16 lg:gap-20 items-start">
            <div className="relative">
              <img src={IMAGES.elena} alt="Елена Милькевич" className="w-full h-auto aspect-[3/4] object-cover rounded-3xl shadow-xl" />
              <div className="absolute bottom-6 left-6 bg-brand-accent text-white px-8 py-5 rounded-2xl shadow-xl">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Опыт практики</p>
                <p className="text-3xl font-bold">20 лет</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-4xl font-medium text-zinc-950 mb-6">Елена Милькевич</h3>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed font-light">
                Психолог и парапсихолог с более чем 20-летней практикой. Соединяет современные знания, древние традиции и опыт глубинной работы с состояниями и запросами участниц.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'более 20 лет практики',
                  'психолог и парапсихолог',
                  'практика расстановщика',
                  'две ступени в атмалогии',
                  'хранитель священной трубки Чанупа',
                  'проводит Темаскаль',
                  'имеет посвящения в буддизме',
                  'пройденный цикл Поиска Видения',
                  'духовная практика через священные танцы Солнца, Луны, Звезды и Кватлики',
                  'соединяет современные знания и древние традиции'
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border-beige shadow-sm transition-all hover:border-brand-accent">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                    <span className="text-sm text-text-main font-medium leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS SECTION */}
      <section className="py-20 lg:py-32 bg-bg-light" id="formats">
        <div className="editorial-layout px-6">
          <SectionHeading 
            centered
            label="Регистрация"
            title="Форматы участия"
            subtitle="Выбери тот формат, который соответствует твоему запросу."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ParticipationCard 
              name="Только «7 Печатей»"
              description="3 июля. Игра с личным запросом и поиском ясности."
              prices={['9 600 ₽', '10 800 ₽', '12 000 ₽']}
            />
            <ParticipationCard 
              name="Только «Темаскаль»"
              description="4 июля. ЦЕРЕМОНИЯ ПЕРВОГО ВДОХА. Работа со стихиями."
              prices={['13 600 ₽', '15 300 ₽', '17 000 ₽']}
            />
            <ParticipationCard 
              name="Игра + Темаскаль"
              description="Пятница и суббота. Работа с запросом и телесное обновление."
              prices={['20 000 ₽', '22 500 ₽', '25 000 ₽']}
            />
            <ParticipationCard 
              name="«Сакральное женское»"
              description="Темаскаль + ночной круг. Глубокое погружение в СЛОЙ: РОД."
              prices={['40 000 ₽', '45 000 ₽', '50 000 ₽']}
            />
            <ParticipationCard 
              name="Полная программа"
              description="3–5 июля. Весь путь через Ум, Тело и Род."
              prices={['48 000 ₽', '54 000 ₽', '60 000 ₽']}
              featured
            />
          </div>
        </div>
      </section>

      {/* BLOCK: FAQ */}
      <section className="py-14 md:py-20 lg:py-32 bg-white" id="faq">
        <div className="editorial-layout px-6">
          <div className="max-w-[1000px] mx-auto">
            <SectionHeading 
              centered
              label="FAQ"
              title="Часто задаваемые вопросы"
              subtitle="Собрали ответы на вопросы, которые обычно возникают перед участием в программе."
            />

            <div className="space-y-4">
              {[
                {
                  id: "faq-0",
                  q: "Можно ли приехать только на один день?",
                  a: "Да, можно выбрать отдельный формат участия: только «7 Печатей» в пятницу или только «Темаскаль» в субботу. При этом САКРАЛЬНАЯ ЖЕНСКАЯ НОЧЬ доступна только после Темаскаля, потому что это продолжение общего пути."
                },
                {
                  id: "faq-1",
                  q: "Можно ли попасть на САКРАЛЬНУЮ ЖЕНСКУЮ НОЧЬ отдельно?",
                  a: "Нет. На ночную церемонию можно попасть только после Темаскаля. Это важная последовательность программы, которую нельзя сокращать."
                },
                {
                  id: "faq-2",
                  q: "Сколько человек будет в группе?",
                  a: "Программа проходит в камерном формате. Всего предусмотрено до 20 участниц, чтобы каждая была включена в общее пространство и получила внимание."
                },
                {
                  id: "faq-3",
                  q: "Что нужно сделать, чтобы забронировать место?",
                  a: "Выберите подходящий формат участия на сайте и нажмите кнопку «Выбрать этот формат». После этого откроется Telegram Насти Радуги, где можно уточнить детали и закрепить место. Для закрепления места можно внести 30% и получить доступ в закрытый чат группы."
                },
                {
                  id: "faq-4",
                  q: "Где проходит программа?",
                  a: "Программа проходит в Ленинградской области, Гатчинский район. Точные детали по месту, бытовым вопросам, питанию и расписанию участницы получают после записи в закрытом чате."
                },
                {
                  id: "faq-5",
                  q: "Нужно ли заранее готовить свой запрос для игры «7 Печатей»?",
                  a: "Желательно приехать с личным запросом: ситуацией, вопросом или внутренним выбором, который давно требует ясности. Если запрос пока не сформулирован точно, его можно будет уточнить в процессе работы."
                },
                {
                  id: "faq-6",
                  q: "Что взять с собой?",
                  a: "Подробный список вещей, рекомендации по одежде, питанию, отдыху и бытовым моментам будет отправлен в закрытом чате после записи. Это позволит подготовиться спокойно и без лишней суеты."
                },
                {
                  id: "faq-7",
                  q: "Подходит ли программа тем, кто раньше не участвовал в таких практиках?",
                  a: "Да, предварительный опыт не обязателен. Важно желание бережно встретиться с собой, быть внимательной к своему состоянию и следовать правилам пространства."
                },
                {
                  id: "faq-8",
                  q: "Можно ли прийти с подругой?",
                  a: "Да. Приходи с подругой — действует реферальная скидка 10% за каждого близкого человека."
                },
                {
                  id: "faq-9",
                  q: "Могут ли участвовать мужчины?",
                  a: "Мужчины могут участвовать в качестве Хранителей: помогать на кухне, у огня и в пространстве программы. Такой формат участия отдельно согласуется с организаторами."
                },
                {
                  id: "faq-10",
                  q: "Это заменяет терапию или медицинскую помощь?",
                  a: "Нет. Программа не является медицинской услугой и не заменяет терапию, лечение или консультацию специалиста. Это пространство практик, женского круга, личного запроса и внутреннего обновления."
                },
                {
                  id: "faq-11",
                  q: "Какой формат выбрать, если я не уверена?",
                  a: "Если есть сомнения, лучше перейти в Telegram через кнопку «Выбрать этот формат» или «Перейти в Telegram» и написать Насте Радуге. Она поможет сориентироваться по форматам и выбрать подходящий вариант."
                }
              ].map((item, idx) => (
                <FAQItem key={item.id} id={item.id} question={item.q} answer={item.a} isOpenDefault={idx === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TELEGRAM FOOTER */}
      <footer className="relative py-20 lg:py-32 bg-white" id="участие">
        <div className="editorial-layout px-6">
          <div className="max-w-[1200px] mx-auto p-10 md:p-16 bg-[#0b0b0d] rounded-[32px] md:rounded-[40px] text-center text-white relative overflow-hidden">
             <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
               Напиши в Telegram Насте Радуге кодовое слово выбранного формата.
             </p>
             
             <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-14 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
               <span className="px-6 py-3 border border-zinc-800 rounded-full whitespace-nowrap">«7 ПЕЧАТЕЙ»</span>
               <span className="px-6 py-3 border border-zinc-800 rounded-full whitespace-nowrap">«ТЕМАСКАЛЬ»</span>
               <span className="px-6 py-3 border border-zinc-800 rounded-full whitespace-nowrap">«ПЕРЕРОЖДЕНИЕ»</span>
               <span className="px-6 py-3 border border-zinc-800 rounded-full text-brand-accent border-zinc-800 whitespace-nowrap">«ИСЦЕЛЕНИЕ»</span>
             </div>
             
             <a 
              href="https://t.me/NastiaRaduga"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-lg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent transition-all duration-300 soft-shadow"
            >
              <Send className="w-4 h-4" /> НАПИСАТЬ В TELEGRAM
            </a>
          </div>
          
          <div className="mt-16 pt-16 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {['Программа', 'Практики', 'Проводник', 'Formats', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={handleSmoothScroll}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 hover:text-brand-accent transition-colors"
                >
                  {item === 'Formats' ? 'Форматы' : item}
                </a>
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">© 2026 · «Исцеление силой любви»</p>
          </div>
        </div>
      </footer>


    </div>
  );
}

function ParticipationCard({ name, description, prices, featured = false }: { name: string, description: string, prices: string[], featured?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-12 rounded-[40px] border transition-all duration-500 flex flex-col h-full relative group ${featured ? 'bg-zinc-950 border-brand-accent text-white scale-105 z-10 shadow-3xl' : 'bg-white border-border-beige text-text-main'}`}
    >
      {featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-black text-[10px] uppercase font-bold tracking-widest px-6 py-2 rounded-full">
          Полный путь
        </span>
      )}
      
      <div className="mb-10">
        <h3 className={`text-2xl mb-6 font-medium leading-tight ${featured ? 'text-brand-accent' : ''}`}>{name}</h3>
        <p className={`text-sm leading-relaxed ${featured ? 'text-zinc-400' : 'text-text-secondary'}`}>{description}</p>
      </div>

      <div className="flex-grow space-y-6 mb-12">
        {[
          { date: 'до 29 мая', price: prices[0] },
          { date: '30 мая — 18 июня', price: prices[1] },
          { date: '19 июня — 3 июля', price: prices[2] }
        ].map((p, i) => (
          <div key={i} className="flex justify-between items-center text-[13px]">
            <span className={featured ? 'text-zinc-500' : 'text-text-muted'}>{p.date}</span>
            <span className={`font-bold ${featured ? 'text-white' : 'text-text-main'}`}>{p.price}</span>
          </div>
        ))}
      </div>

      <a 
        href={TG_LINK}
        target="_blank"
        rel="noreferrer"
        className={`block text-center py-5 rounded-xl text-[11px] uppercase tracking-widest font-bold transition-all ${featured ? 'bg-white text-black hover:bg-brand-accent' : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-900 hover:text-white'}`}
      >
        Выбрать этот формат
      </a>
    </motion.div>
  );
}

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpenDefault?: boolean;
  key?: React.Key;
}

const FAQItem = ({ id, question, answer, isOpenDefault = false }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border border-border-beige rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-brand-accent">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="text-lg font-medium text-zinc-950 pr-8">{question}</span>
        <div className={`shrink-0 w-6 h-6 rounded-full border border-border-beige flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-accent text-white border-brand-accent' : 'text-text-muted'}`}>
          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-8 pb-8 text-text-secondary text-sm leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
