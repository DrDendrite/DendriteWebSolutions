// DendriteWebSolutions - Configuration File
// Website settings and constants

const CONFIG = {
    // Company Information
    company: {
        name: 'DendriteWebSolutions',
        tagline: 'Affordable web design and hosting solutions that help small businesses get seen online.',
        email: 'info@dendritewebsolutions.com',
        phone: '+1 (555) 123-4567',
        website: 'https://dendritewebsolutions.com'
    },

    // Business Hours
    businessHours: {
        weekdays: 'Monday - Friday: 9AM - 6PM',
        saturday: 'Saturday: 10AM - 4PM',
        sunday: 'Sunday: Closed'
    },

    // Services Offered
    services: [
        {
            id: 'web-design',
            name: 'Web Design',
            icon: '🌐',
            description: 'Professional, responsive websites designed to showcase your business and attract customers. Modern designs that work on all devices.'
        },
        {
            id: 'cloud-hosting',
            name: 'Cloud Hosting',
            icon: '☁️',
            description: 'Reliable hosting on major platforms like Google Cloud and AWS, or affordable local server solutions tailored to your budget.'
        },
        {
            id: 'ssl-certificates',
            name: 'SSL Certificates',
            icon: '🔒',
            description: 'Secure your website and build trust with customers through professional SSL certificates and security implementations.'
        },
        {
            id: 'domain-names',
            name: 'Domain Names',
            icon: '🏷️',
            description: 'Help you find and register the perfect domain name for your business, with full management and renewal services.'
        },
        {
            id: 'mobile-optimization',
            name: 'Mobile Optimization',
            icon: '📱',
            description: 'Ensure your website looks and performs perfectly on smartphones, tablets, and all mobile devices.'
        },
        {
            id: 'performance-optimization',
            name: 'Performance Optimization',
            icon: '🚀',
            description: 'Fast-loading websites that rank better in search engines and provide excellent user experiences.'
        }
    ],

    // Animation Settings
    animations: {
        scrollOffset: 100,
        fadeInDuration: 600,
        particleCount: 50,
        particleCountMobile: 20
    },

    // Form Settings
    form: {
        successMessage: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        errorMessage: 'Please fill in all required fields.',
        responseTime: '24 hours'
    },

    // Theme Colors (CSS Custom Properties)
    colors: {
        primaryBg: '#0a0a0a',
        secondaryBg: '#1a1a1a',
        accentBg: '#2a2a2a',
        neonMagenta: '#ff00ff',
        neonCyan: '#00ffff',
        neonGreen: '#00ff00',
        neonYellow: '#ffff00',
        textPrimary: '#ffffff',
        textSecondary: '#cccccc',
        textMuted: '#888888'
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}