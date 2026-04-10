import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  engineStarted = signal(false);
  rideMode = signal<'street' | 'track'>('street');
  explainMode = signal(false);
  mouseX = 0;
  mouseY = 0;
  currentSpeed = 0;
  activeGear = 1;

  posts = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=500',
      likes: '1.2k',
      caption: 'Night rides through the digital valley.',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=500',
      likes: '840',
      caption: 'Clean code, clean lines.',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=500',
      likes: '2.1k',
      caption: 'Throttle therapy after a long sprint.',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1558980394-0cb3f55d4b4c?q=80&w=500',
      likes: '1.5k',
      caption: 'The orange beast wakes up.',
    },
  ];

  hubTips = [
    {
      icon: '⚠️',
      title: 'Break-in',
      desc: 'Keep it under 7,500 RPM for the first 1,000km.',
      tag: 'Beginner',
    },
    {
      icon: '🧠',
      title: 'Slipper Clutch',
      desc: 'Downshift without rear wheel lock.',
      tag: 'Pro',
    },
    {
      icon: '🔥',
      title: 'Chain Care',
      desc: 'Clean and lube every 500km for maximum longevity.',
      tag: 'Maintenance',
    },
  ];

  ngOnInit() {
    // Ensuring Tailwind is properly recognized for dynamic styles if the user has custom config
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  startEngine() {
    this.engineStarted.set(true);
    this.animateSpeed();
  }

  toggleRideMode() {
    this.rideMode.set(this.rideMode() === 'street' ? 'track' : 'street');
  }

  animateSpeed() {
    let speed = 0;
    const interval = setInterval(() => {
      if (speed < 148) {
        speed += 2; // Faster increment for better UX
        this.currentSpeed = speed;
      } else {
        clearInterval(interval);
      }
    }, 15);
  }

  cycleGear() {
    this.activeGear = this.activeGear >= 6 ? 1 : this.activeGear + 1;
  }
}
