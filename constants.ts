import type { Profession, Skill, Attributes, OMI, OS } from './types';

export const PROFESSIONS: Profession[] = [
    { name: "Частный Детектив", description: "Пыльный офис, дешевый виски, шляпа на глазах. Ты – последний бастион справедливости в городе, где правда стоит дешевле пули.", skills: ["Внимательность", "Допрос", "Поиск", "Проницательность", "Пистолеты", "Рукопашный бой", "Знание Улиц", "Обман"], credit: "Низкий / Средний", gear: "Поношенный плащ и шляпа; пистолет .38 калибра; блокнот; старый микровычислитель; бутылка дешевого виски." },
    { name: "Ветеран Корпоративных Войн", description: "Война не закончилась, она просто сменила поле боя. Шрамы и несколько кусков казенного железа в теле – вот твое наследство.", skills: ["Винтовки/Дробовики", "Рукопашный бой", "Уклонение", "Внимательность", "Запугивание", "Ремонт (Механика)", "Медицина"], credit: "Низкий", gear: "Старая армейская куртка; тяжелые ботинки; надежный нож; списанное армейское оружие." },
    { name: "Полицейский", description: "Значок дает власть, но чаще всего он лишь прикрытие для коррупции. Ты плывешь против течения или давно понял правила игры.", skills: ["Пистолеты", "Рукопашный бой", "Вождение (Авто)", "Допрос", "Закон", "Знание Улиц", "Внимательность", "Запугивание"], credit: "Средний", gear: "Полицейская форма; табельный пистолет; дубинка; наручники; доступ к полицейской базе данных." },
    { name: "Врач / Риппердок", description: "Плоть слаба, но технологии могут ее исправить. Ты штопаешь раны от пуль в подвале или латаешь богачей в дорогой клинике.", skills: ["Медицина", "Кибернетика", "Наука (Химия)", "Проницательность", "Внимательность", "Ловкость Рук", "Знание (Подполье)", "Торговля"], credit: "Высокий (врач) / Низкий (риппердок)", gear: "Качественный медицинский саквояж; доступ к имплантам; стерильные инструменты / Сомнительный саквояж; подпольные импланты; нестерильные инструменты." },
    { name: "Хакер / Нетраннер", description: "Данные – новая валюта. Ты – призрак в машине, способный проникать в защищенные системы и красть информацию.", skills: ["Взлом (Компьютеры)", "Ремонт (Электроника)", "Наука (Физика)", "Внимательность", "Скрытность", "Знание (Корпорации)", "Язык (Программирования)"], credit: "Варьируется", gear: "Портативный микровычислитель (дек); набор инструментов; кабели; кастомный ОМИ." },
    { name: "Журналист / Информатор", description: "В городе лжи слово – это оружие. Ты ищешь правду для первых полос или торгуешь слухами в темных переулках.", skills: ["Болтовня", "Проницательность", "Внимательность", "Знание Улиц", "Обман", "Поиск", "Этикет / Знание Корп."], credit: "Низкий / Средний", gear: "Блокнот; диктофон; портативный микровычислитель; дешевый фотоаппарат." },
    { name: "Инженер / Техник", description: "Мир держится на технологиях, и ты тот, кто заставляет их работать. Или ломает по заказу.", skills: ["Ремонт (Механика)", "Ремонт (Электроника)", "Кибернетика", "Взлом (Замки)", "Наука (Физика)", "Внимательность", "Поиск"], credit: "Средний", gear: "Набор инструментов; мультиметр; паяльник; защитные очки; рабочий комбинезон." },
    { name: "Фиксер / Контрабандист", description: "Ты – связующее звено, человек, который знает людей и может достать что угодно, если цена подходящая.", skills: ["Торговля", "Болтовня", "Обман", "Знание Улиц", "Знание (Подполье)", "Проницательность", "Вождение (Авто)"], credit: "Варьируется", gear: "Стильная одежда; несколько телефонов; зашифрованные контакты; неприметный автомобиль." },
    { name: "Член Банды / Телохранитель", description: "Улица – это джунгли. Ты либо хищник, либо добыча. Рефлексы и мускулы – вот что помогает тебе выжить.", skills: ["Рукопашный бой", "Хол. оружие (Клинки)", "Пистолеты", "Запугивание", "Знание Улиц", "Внимательность", "Уклонение"], credit: "Низкий", gear: "Кожаная куртка и кастет; нож; дешевый пистолет / Деловой костюм; бронежилет; хороший пистолет." },
    { name: "Корпоративный Служащий", description: "Ты был винтиком в машине корпорации. Но что-то пошло не так, и теперь ты пытаешься выжить снаружи, используя свои знания.", skills: ["Бюрократия", "Знание (Корпорации)", "Этикет / Знание Корп.", "Обман", "Проницательность", "Болтовня", "Поиск"], credit: "Средний / Низкий", gear: "Деловой костюм; корпоративный ID (возможно, поддельный); доступ к некоторым корпоративным ресурсам." },
    { name: "Ученый / Исследователь", description: "Знание – сила, но в этом мире оно часто служит разрушению. Ты создаешь новые технологии или опасные вещества.", skills: ["Наука (Химия)", "Наука (Физика)", "Наука (Биология)", "Медицина", "Внимательность", "Поиск", "Ремонт (Электроника)"], credit: "Средний / Высокий", gear: "Лабораторный халат; защитные очки; доступ к лаборатории; специализированные инструменты." },
    { name: "Иностранный Агент", description: "Ты – шпион, работающий на иностранное правительство. Ты одинок в чужой стране, и ошибка может стоить тебе жизни.", skills: ["Обман", "Скрытность", "Язык (Другой: Английский)", "Внимательность", "Пистолеты", "Взлом (Компьютеры)", "Проницательность"], credit: "Варьируется", gear: "Неприметная одежда; поддельные документы; пистолет с глушителем; запас наличных." },
];

export const ATTRIBUTES_DATA: Attributes = { 'СИЛ': { name: 'Сила', value: 0 }, 'ЛОВ': { name: 'Ловкость', value: 0 }, 'ТЕЛ': { name: 'Телосложение', value: 0 }, 'ИНТ': { name: 'Интеллект', value: 0 }, 'ВОС': { name: 'Восприятие', value: 0 }, 'ХАР': { name: 'Харизма', value: 0 }, 'ВОЛ': { name: 'Воля', value: 0 }, 'ОБР': { name: 'Образование', value: 0 } };
export const ATTRIBUTE_VALUES: number[] = [80, 70, 60, 60, 50, 50, 50, 40];

export const SKILLS: Skill[] = [
    { category: 'Боевые', name: 'Пистолеты', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Боевые', name: 'Винтовки/Дробовики', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Боевые', name: 'Рукопашный бой', formula: (a) => Math.floor((a.ЛОВ.value + a.СИЛ.value) / 4) },
    { category: 'Боевые', name: 'Уклонение', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Боевые', name: 'Хол. оружие (Клинки)', formula: (a) => Math.floor((a.ЛОВ.value + a.СИЛ.value) / 4) },
    { category: 'Исследовательские', name: 'Внимательность', formula: (a) => a.ВОС.value },
    { category: 'Исследовательские', name: 'Допрос', formula: (a) => Math.floor((a.ХАР.value + a.ВОЛ.value) / 4) },
    { category: 'Исследовательские', name: 'Поиск', formula: (a) => a.ВОС.value },
    { category: 'Исследовательские', name: 'Проницательность', formula: (a) => Math.floor((a.ВОС.value + a.ХАР.value) / 4) },
    { category: 'Технические', name: 'Взлом (Компьютеры)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Взлом (Замки)', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Технические', name: 'Кибернетика', formula: (a) => Math.floor((a.ИНТ.value + a.ЛОВ.value) / 4) },
    { category: 'Технические', name: 'Медицина', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Наука (Химия)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Наука (Физика)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Наука (Биология)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Ремонт (Электроника)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Технические', name: 'Ремонт (Механика)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Социальные', name: 'Болтовня', formula: (a) => a.ХАР.value },
    { category: 'Социальные', name: 'Запугивание', formula: (a) => Math.floor((a.СИЛ.value + a.ХАР.value) / 4) },
    { category: 'Социальные', name: 'Знание Улиц', formula: (a) => Math.floor((a.ХАР.value + a.ИНТ.value) / 4) },
    { category: 'Социальные', name: 'Обман', formula: (a) => a.ХАР.value },
    { category: 'Социальные', name: 'Торговля', formula: (a) => a.ХАР.value },
    { category: 'Социальные', name: 'Этикет / Знание Корп.', formula: (a) => a.ОБР.value },
    { category: 'Двигательные', name: 'Вождение (Авто)', formula: (a) => a.ЛОВ.value },
    { category: 'Двигательные', name: 'Ловкость Рук', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Двигательные', name: 'Скрытность', formula: (a) => Math.floor(a.ЛОВ.value / 2) },
    { category: 'Знания', name: 'Бюрократия', formula: (a) => Math.floor(a.ОБР.value / 2) },
    { category: 'Знания', name: 'Закон', formula: (a) => Math.floor(a.ОБР.value / 2) },
    { category: 'Знания', name: 'Язык (Другой: Английский)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Знания', name: 'Язык (Программирования)', formula: (a) => Math.floor(a.ИНТ.value / 2) },
    { category: 'Знания', name: 'Знание (Корпорации)', formula: (a) => Math.floor(a.ОБР.value / 2) },
    { category: 'Знания', name: 'Знание (Подполье)', formula: (a) => Math.floor(a.ОБР.value / 2) },
];

export const OMIS: OMI[] = [
    // AAC
    { id: 'echelon-d', name: 'Echelon-D', manufacturer: 'General Cybernetics (GC)', level: 'Гражданский', slots: 1, memory: 32, overheatMod: 0, compatibility: 'AAC', price: 1200, note: 'Массовый, грязный СМ. Риск ЭСКТ.', faction: 'AAC' },
    { id: 'synchro-disc-mk2', name: 'Synchro-Disc Mk.II', manufacturer: 'General Cybernetics (GC)', level: 'Гражданский', slots: 2, memory: 64, overheatMod: 0, compatibility: 'AAC', price: 3000, note: 'Стандартный офисный ОМИ.', faction: 'AAC' },
    { id: 'enforcer-s', name: 'Enforcer-S', manufacturer: 'Milspec Solutions (MS)', level: 'Полиция', slots: 3, memory: 64, overheatMod: 1, compatibility: 'AAC', price: 9000, note: 'Аппаратный тактический ускоритель.', faction: 'AAC' },
    { id: 'atlantium-core', name: 'Atlantium-Core', manufacturer: 'Milspec Solutions (MS)', level: 'Инженерный', slots: 2, memory: 128, overheatMod: 2, compatibility: 'AAC (Атлантиум)', price: 14000, note: 'Интерфейс реакторов "Циклоп".', faction: 'AAC' },
    { id: 'zevs-conduit', name: 'Zevs-Conduit', manufacturer: 'Milspec Solutions (MS)', level: 'Военный', slots: 2, memory: 128, overheatMod: 2, compatibility: 'AAC (Силовой)', price: 24000, note: 'Интерфейс ЭМ-оружия "Зевс".', faction: 'AAC' },
    { id: 'manhattan-prime', name: 'Manhattan-Prime', manufacturer: 'Neurodine Systems (NS)', level: 'Элита', slots: 4, memory: 256, overheatMod: 1, compatibility: 'AAC (Элита)', price: 50000, note: 'Синаптический ускоритель.', faction: 'AAC' },
    { id: 'warlord-command', name: 'Warlord-Command', manufacturer: 'Neurodine Systems (NS)', level: 'Прототип', slots: 4, memory: 512, overheatMod: 2, compatibility: 'AAC (Тактика)', price: 75000, note: 'Управление отрядом (нейро-сеть).', faction: 'AAC' },
    // SOV
    { id: 'narodny-1m', name: 'Narodny-1M', manufacturer: 'SOV ("Красный Молот")', level: 'Гражданский', slots: 1, memory: 32, overheatMod: 1, compatibility: 'SOV', price: 1000, note: 'На "Союз-Стали-К". Сверхнадежен.', faction: 'SOV' },
    { id: 'partiyniy-b', name: 'Partiyniy-B', manufacturer: 'SOV ("Вымпел")', level: 'Администрат.', slots: 2, memory: 64, overheatMod: 0, compatibility: 'SOV', price: 3800, note: 'Встроен видео-модуль "Цензор".', faction: 'SOV' },
    { id: 'krepost', name: 'Krepost', manufacturer: 'SOV ("Заслон")', level: 'Военный', slots: 3, memory: 64, overheatMod: 2, compatibility: 'SOV', price: 8500, note: 'Тяжелый. Лучшая защита от ЭМП.', faction: 'SOV' },
    { id: 'gefest-link', name: 'Gefest-Link', manufacturer: 'SOV ("Заслон")', level: 'Военный (Страт.)', slots: 2, memory: 128, overheatMod: 1, compatibility: 'SOV (Ядерный)', price: 16000, note: 'Протоколы запуска "Гефест".', faction: 'SOV' },
    { id: 'polkovodets', name: 'Polkovodets', manufacturer: 'SOV ("Заслон")', level: 'Элита', slots: 4, memory: 256, overheatMod: 1, compatibility: 'SOV (Тактика)', price: 22000, note: 'Управление отрядом (до 12 "Krepost").', faction: 'SOV' },
    { id: 'ten', name: "Ten'", manufacturer: 'SOV (4-е Упр.)', level: 'Спецслужбы', slots: 3, memory: 128, overheatMod: 0, compatibility: 'SOV (Скрытый)', price: 35000, note: '"Холодный" режим, японские СМ.', faction: 'SOV' },
    // Japan
    { id: 'sakura-s', name: 'Sakura-S', manufacturer: 'Yamato Biodyne', level: 'Гражданский', slots: 2, memory: 64, overheatMod: 0, compatibility: 'Japan', price: 3000, note: '"Нейрогель-Ямато". 0% отторжения.', faction: 'Japan' },
    { id: 'shokunin', name: 'Shokunin', manufacturer: 'Kobayashi Co.', level: 'Проф.', slots: 3, memory: 128, overheatMod: 0, compatibility: 'Japan', price: 9500, note: 'Высокоточный моторный сопроцессор.', faction: 'Japan' },
    { id: 'bushido-core', name: 'Bushido-Core', manufacturer: 'Yamato Biodyne', level: 'Безопасность', slots: 4, memory: 128, overheatMod: 1, compatibility: 'Japan', price: 17000, note: 'Рефлекторный ускоритель "Молния".', faction: 'Japan' },
    { id: 'tetsugen-node', name: 'Tetsugen-Node', manufacturer: 'Kobayashi Co.', level: 'Элита (Инж.)', slots: 5, memory: 256, overheatMod: 2, compatibility: 'Japan (Реактор)', price: 42000, note: 'Интерфейс реакторов "Тэцугэн"', faction: 'Japan' },
    { id: 'amaterasu', name: 'Amaterasu', manufacturer: 'Yamato Biodyne', level: 'Элита (Нетран.)', slots: 6, memory: 512, overheatMod: -1, compatibility: 'Japan (Взлом)', price: 60000, note: '"Песочница" для "мокрого ПО".', faction: 'Japan' },
    { id: 'kusanagi-shell', name: 'Kusanagi-Shell', manufacturer: 'Kobayashi Co.', level: 'Прототип', slots: 7, memory: 0, overheatMod: 0, compatibility: 'Japan (Уникал.)', price: 0, note: 'Шлюз переноса сознания (Проект 1950 г.)', faction: 'Japan' },
    // Black Market
    { id: 'jailbreak', name: 'Jailbreak', manufacturer: 'Рипперы', level: 'Гражданский', slots: 2, memory: 32, overheatMod: -1, compatibility: 'Универсал (Взлом)', price: 800, note: 'Нет файрволов, нестабилен.', faction: 'Black Market' },
    { id: 'pit-fight', name: 'Pit-Fighter', manufacturer: 'Рипперы', level: 'Боевой', slots: 3, memory: 64, overheatMod: 1, compatibility: 'Универсал (Бой)', price: 15000, note: 'Только боевые модули. Подавление личности.', faction: 'Black Market' },
    { id: 'chimera', name: 'Chimera', manufacturer: 'Рипперы', level: 'Прототип', slots: 5, memory: 128, overheatMod: -2, compatibility: 'Универсал (Гибрид)', price: 25000, note: 'Сборка из 2-3 ОМИ. Высокий риск психоза.', faction: 'Black Market' },
    { id: 'ghost', name: 'Ghost', manufacturer: 'Рипперы', level: 'Спецслужбы', slots: 6, memory: 256, overheatMod: 1, compatibility: '(Украден)', price: 80000, note: 'Краденая "Ten\'" или "Amaterasu". Есть "маяк".', faction: 'Black Market' },
];

export const OPERATING_SYSTEMS: OS[] = [
    // AAC
    { id: 'echelon-os', name: 'EchelonOS (Базовая)', manufacturer: 'General Cybernetics (GC)', omiCompat: ['Echelon-D', 'Synchro-Disc'], bonus: 'Стандартный рабочий интерфейс.', defense: '"AAC Firewall" (Уровень 1): Базовая защита, имеет бэкдоры AAC.', scripts: ['Рабочий Протокол', 'Терминал'], price: 500, faction: 'AAC' },
    { id: 'dominion-c-os', name: 'Dominion C-OS (Корпоративный)', manufacturer: 'AAC', omiCompat: ['Synchro-Disc', 'Enforcer-S'], bonus: '"Агрессивный Протокол": +10% к эффективности скриптов взлома и ЭМ-оружия.', defense: '"Aegis Firewall" (Уровень 2): Корпоративный файрвол, логирует все вторжения.', scripts: ['Enforcer-Tactics', 'Zevs-Link'], price: 4000, faction: 'AAC' },
    { id: 'atlantium-shell', name: 'Atlantium-Shell', manufacturer: 'Milspec Solutions (MS)', omiCompat: ['Atlantium-Core'], bonus: '"Ядерный Интерфейс": Прямое управление реакторами "Циклоп". Снижает риск перегрева от реактора.', defense: '"Rad-Shield" (Уровень 3): Высокая защита от ЭМП и радиационных помех.', scripts: ['Cyclops-Control', 'Rad-Clean'], price: 9000, faction: 'AAC' },
    { id: 'manhattan-interface', name: 'Manhattan-Interface', manufacturer: 'Neurodine Systems (NS)', omiCompat: ['Manhattan-Prime', 'Warlord'], bonus: '"Многозадачность": Позволяет запускать 1 скрипт в "фоновом режиме" (не для боевой).', defense: '"Black Box" (Уровень 4): Записывает сигнатуру взломщика для контр-атаки.', scripts: ['Warlord-Net', 'Market-Analyzer'], price: 15000, faction: 'AAC' },
    // SOV
    { id: 'krepost-os', name: 'Krepost-OS ("Заслон")', manufacturer: 'SOV', omiCompat: ['Narodny', 'Krepost'], bonus: '"Железная Воля": +20% к сопротивлению скриптам пси-воздействия (страх, контроль).', defense: '"Zaslon" (Уровень 3): Брутальное шифрование. Трудно взломать, но "шумный" (легко заметить).', scripts: ['Gefest-Key', 'Krepost-Link'], price: 3500, faction: 'SOV' },
    { id: 'kollektiv-os', name: 'Kollektiv-OS ("Заслон")', manufacturer: 'SOV', omiCompat: ["Polkovodets", "Ten'"], bonus: '"Улей": Позволяет синхронизировать тактические данные с 12 союзниками (с "Krepost-OS").', defense: '"Kollektiv-Shield" (Уровень 4): Защита усиливается за каждого союзника в "Улье".', scripts: ['Polkovodets-Tactics', "Ten'-Protokol"], price: 12000, faction: 'SOV' },
    { id: 'partiya-shell', name: 'Partiya-Shell ("Вымпел")', manufacturer: 'SOV', omiCompat: ['Partiyniy-B'], bonus: '"Цензор": Автоматически блокирует враждебную пропаганду и пси-атаки (но и снижает инициативу).', defense: '"Ideology-Wall" (Уровень 2): Блокирует чужеродные сигнатуры.', scripts: ['ГосАрхив-Доступ'], price: 'Бесплатно', faction: 'SOV' },
    // Japan
    { id: 'sakura-os', name: 'Sakura-OS', manufacturer: 'Yamato Biodyne', omiCompat: ['Sakura-S'], bonus: '"Био-Интерфейс": Снижает ментальную нагрузку. Модификатор ПП ОМИ снижается на 1 (мин. 0).', defense: '"Yamato-Gel" (Уровень 1): Пассивная био-защита.', scripts: ['Гармония (Снижение стресса)'], price: 2500, faction: 'Japan' },
    { id: 'shokunin-frame', name: 'Shokunin-Frame', manufacturer: 'Kobayashi Co.', omiCompat: ['Shokunin', 'Bushido'], bonus: '"Фокус Мастера": +20% к эффективности скриптов, требующих точности (медицина, техника, моторика).', defense: '"Bushido-Wall" (Уровень 3): Активный файрвол, контратакует взломщика.', scripts: ['Shokunin-Tools', 'Bushido-Reflex'], price: 8000, faction: 'Japan' },
    { id: 'amaterasu-os', name: 'Amaterasu-OS', manufacturer: 'Yamato Biodyne', omiCompat: ['Amaterasu'], bonus: '"Песочница" (Sandbox): Можно запускать скрипты в виртуальной среде (безопасный тест).', defense: '"Amaterasu Black Ice" (Уровень 5): Летальная контратака. Может "сжечь" ОМИ взломщика.', scripts: ['Amaterasu-Dive', 'Black Ice'], price: 40000, faction: 'Japan' },
    { id: 'kusanagi-os', name: 'Kusanagi-OS', manufacturer: 'Kobayashi Co.', omiCompat: ['Kusanagi-Shell'], bonus: '"Врата Души": Единственная ОС, способная запустить Протокол Переноса Сознания.', defense: '"Неприступная" (Уровень 6): Практически невозможно взломать извне.', scripts: ['Kusanagi-Protocol'], price: 'Не продается', faction: 'Japan' },
    // Black Market
    { id: 'korneva-os', name: 'Korneva-OS (Root)', manufacturer: 'Рипперы', omiCompat: ['Любой (Jailbreak)'], bonus: '"Нет Оков": Игнорирует DRM и блокировки AAC/SOV. Позволяет запускать любые скрипты.', defense: 'Нет (Уровень 0): Все порты открыты по умолчанию.', scripts: ['Shocker', 'Blackout', 'Ripper-Tools'], price: 500, faction: 'Black Market' },
    { id: 'chimera-frame', name: 'Chimera-Frame', manufacturer: 'Рипперы', omiCompat: ['Chimera (Гибрид)'], bonus: '"Гибрид": Позволяет устанавливать скрипты разных фракций одновременно (н-р, "Zevs-Link" и "Bushido-Reflex").', defense: 'Нестабильная (Уровень 1-4): Защита "глючит", может отказать в любой момент.', scripts: ['Hybrid-Scripts (уникальные)'], price: 10000, faction: 'Black Market' },
];
