export interface NavigationItem {
  id: string;
  label: string;
}

export interface Card {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  step: string;
  title: string;
  description: string;
  quote?: string;
  reference?: string;
}

export interface ElementItem {
  number?: string;
  icon?: string;
  title: string;
  description: string;
}

export interface ElementSection {
  title: string;
  items: ElementItem[];
}

export interface TheologyAspect {
  icon: string;
  title: string;
  description: string;
}

export interface TheologyEffect {
  icon: string;
  title: string;
  description: string;
}

export interface SymbolItem {
  symbol?: string;
  icon?: string;
  title: string;
  description: string;
}

export interface Prayer {
  title: string;
  text: string;
}

export interface PrayerSection {
  title: string;
  prayers: Prayer[];
}

export interface UniversalPrayer {
  title: string;
  text: string;
  author: string;
}

export interface ResourceCategory {
  icon: string;
  title: string;
  items: string[];
}

export interface Deepening {
  title: string;
  description: string;
  tags: string[];
}

export interface EucharistData {
  site: {
    title: string;
    subtitle: string;
    description: string;
    keywords: string;
  };
  navigation: {
    brand: string;
    items: NavigationItem[];
  };
  hero: {
    title: string;
    quote: string;
    subtitle: string;
    cta: string;
  };
  definition: {
    title: string;
    subtitle: string;
    cards: Card[];
  };
  history: {
    title: string;
    subtitle: string;
    timeline: TimelineItem[];
  };
  elements: {
    title: string;
    subtitle: string;
    sections: ElementSection[];
  };
  theology: {
    title: string;
    subtitle: string;
    aspects: TheologyAspect[];
    effects: {
      title: string;
      items: TheologyEffect[];
    };
  };
  symbols: {
    title: string;
    subtitle: string;
    items: SymbolItem[];
  };
  prayers: {
    title: string;
    subtitle: string;
    sections: PrayerSection[];
    universal: UniversalPrayer;
  };
  resources: {
    title: string;
    subtitle: string;
    categories: ResourceCategory[];
    deepening: Deepening;
  };
  footer: {
    title: string;
    quote: string;
    reference: string;
    copyright: string;
  };
}