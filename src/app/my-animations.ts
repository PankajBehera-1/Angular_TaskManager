import { trigger, query, transition, style, animate, group } from '@angular/animations';

export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', 
      style({ position: 'absolute', width: '100%', opacity: 0, transform: 'translateX(10%)' }), 
      { optional: true }
    ),
    group([
      query(':enter', [
        style({ opacity: 0, transform: 'translateX(-10%)' }),
        animate('0.6s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('0.6s ease-in-out', style({ opacity: 0, transform: 'translateX(10%)' }))
      ], { optional: true })
    ])
  ])
]);


//slideup animation

export const slideUpAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', 
      style({ position: 'absolute', width: '98%'}), 
      { optional: true }
    ),
    group([
      query(':enter', [
        style({transform: 'translateY(-100%)' }),
        animate('0.6s', style({transform: 'translateY(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('0.6s', style({ opacity: 0, transform: 'translateY(-100%)' }))
      ], { optional: true })
    ])
  ])
]);

//Zoom-up animation

export const zoomUpAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', 
      style({ position: 'absolute', width: '100%', transform: 'scale(1) translateY(0)' }), 
      { optional: true }
    ),
    group([
      query(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(10%)' }), 
        animate('0.8s ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' })) 
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        animate('0.6s ease-in', style({ opacity: 0, transform: 'scale(0.8) translateY(-10%)' })) 
      ], { optional: true })
    ])
  ])
]);