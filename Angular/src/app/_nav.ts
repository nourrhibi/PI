import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Profil',
    url: '/dashboard',
    icon: 'cil-contact',

  },

  {
    name: 'Location',
    url: '/location',
    icon: 'cil-location-pin'
  },
  {
    name: 'Santé',
    url: '/sante',
    icon: 'cil-heart'
  },
  {
    name: 'Statistique',
    url: 'Statistique',
    icon: 'cil-chart-line'
  },
  {
    name: 'logout',
    url: '/login',
    icon: 'cil-power-standby',


  },

  {
    name: 'Moving-Eye',
    url: 'http://coreui.io/angular/',
    icon: 'cil-low-vision',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },

];
