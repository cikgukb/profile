/* ============================================================
   DATA ACARA & KALENDAR — cikgukb.my
   ------------------------------------------------------------
   Fail ini menguruskan senarai acara, bengkel, seminar dan latihan.
   ============================================================ */

const EVENTS_DATA = [
    {
        id: 'bengkel-ai-marketing-aug-2026',
        title: {
            ms: 'Bengkel Hands-on AI Marketing & Content Automation 2026',
            en: 'Hands-on AI Marketing & Content Automation Workshop 2026'
        },
        type: 'workshop', // 'workshop' | 'seminar' | 'webinar' | 'corporate'
        status: 'open', // 'open' | 'upcoming' | 'completed'
        date: '2026-08-22',
        endDate: '2026-08-23',
        displayDate: {
            ms: '22 – 23 Ogos 2026 (Sabtu & Ahad)',
            en: '22 – 23 August 2026 (Saturday & Sunday)'
        },
        time: '09:00 AM – 05:00 PM',
        location: {
            ms: 'Kuala Lumpur / Dewan Latihan KB Beyond Creative',
            en: 'Kuala Lumpur / KB Beyond Creative Training Hall'
        },
        venue: {
            ms: 'Tingkat 3, Pusat Komersial Bandar Kinrara, Puchong / Mod Dalam Talian (Hybrid)',
            en: 'Level 3, Bandar Kinrara Commercial Centre, Puchong / Online Hybrid Option'
        },
        organizer: 'KB Beyond Creative Sdn Bhd',
        summary: {
            ms: 'Bengkel intensif 2 hari mempelajari teknik menulis prompt tahap profesional, menjana visual iklan AI, dan membina automasi media sosial menggunakan ChatGPT, Claude & Midjourney.',
            en: 'A 2-day intensive workshop learning professional prompt engineering, AI ad visual generation, and social media automation using ChatGPT, Claude & Midjourney.'
        },
        highlights: {
            ms: [
                'Bina templat prompt khas untuk produk & perkhidmatan anda sendiri',
                'Penjanaan visual produk & poster kempen bertaraf agensi',
                'Automasi saluran jawapan prospek WhatsApp & borang jualan',
                'Nota rujukan fizikal & koleksi 100+ prompt sedia guna',
                'Tuntutan HRD Corp Claimable (tertakluk kelulusan syarikat)'
            ],
            en: [
                'Build custom prompt templates for your specific products & services',
                'Generate agency-grade product visuals & campaign posters',
                'Automate WhatsApp prospect responses & sales forms',
                'Physical reference notes & 100+ ready-to-use prompt library',
                'HRD Corp Claimable (subject to company approval)'
            ]
        },
        targetAudience: {
            ms: 'Usahawan SME, Pengurus Pemasaran, Content Creator, dan Pasukan Agensi',
            en: 'SME Entrepreneurs, Marketing Managers, Content Creators, and Agency Teams'
        },
        registrationUrl: 'https://wa.me/60133815817?text=Saya%20berminat%20nak%20mendaftar%20Bengkel%20AI%20Marketing%20Ogos%202026'
    },
    {
        id: 'masterclass-strategi-pemasaran-sep-2026',
        title: {
            ms: 'Masterclass Strategi Pemasaran Digital & Kedudukan Jenama',
            en: 'Digital Marketing Strategy & Brand Positioning Masterclass'
        },
        type: 'seminar',
        status: 'open',
        date: '2026-09-12',
        endDate: '2026-09-12',
        displayDate: {
            ms: '12 September 2026 (Sabtu)',
            en: '12 September 2026 (Saturday)'
        },
        time: '08:30 AM – 01:00 PM',
        location: {
            ms: 'Bangi Resort Hotel, Bandar Baru Bangi',
            en: 'Bangi Resort Hotel, Bandar Baru Bangi'
        },
        venue: {
            ms: 'Grand Ballroom, Bangi Resort Hotel',
            en: 'Grand Ballroom, Bangi Resort Hotel'
        },
        organizer: 'KB Beyond Creative Sdn Bhd',
        summary: {
            ms: 'Sesi khas menyusun semula kerangka pemasaran perniagaan anda — daripada penentuan target segmen, tawaran nilai (value proposition) sehinggalah susunan funnel jualan berkesan.',
            en: 'A strategic session to restructure your business marketing framework — from target segmenting and value proposition to effective sales funnel design.'
        },
        highlights: {
            ms: [
                'Bedah siasat kesilapan biasa strategi pemasaran tempatan',
                'Kerangka 4 Langkah Diagnos-Reka-Bina-Upaya Cikgu KB',
                'Panduan menyusun bajet iklan & pengiraan ROI pemasaran',
                'Sesi soalan jawab berdepan (Q&A) terus bersama Trainer'
            ],
            en: [
                'Deep-dive audit into common local marketing mistakes',
                'Cikgu KB’s 4-Step Diagnose-Design-Build-Empower framework',
                'Ad budget allocation & marketing ROI calculation roadmap',
                'Direct face-to-face Q&A session with the Lead Trainer'
            ]
        },
        targetAudience: {
            ms: 'Pemilik Perniagaan, Founder Brand, Pengarah Syarikat & Perunding Pemasaran',
            en: 'Business Owners, Brand Founders, Company Directors & Marketing Consultants'
        },
        registrationUrl: 'https://wa.me/60133815817?text=Saya%20berminat%20nak%20sertai%20Masterclass%20Strategi%20Pemasaran%20Sept%202026'
    },
    {
        id: 'webinar-percuma-broke-framework-jul-2026',
        title: {
            ms: 'Webinar Live: Asas Prompting Kerangka BROKE untuk Operasi Harian',
            en: 'Live Webinar: BROKE Framework Prompting Basics for Daily Operations'
        },
        type: 'webinar',
        status: 'upcoming',
        date: '2026-07-30',
        endDate: '2026-07-30',
        displayDate: {
            ms: '30 Julai 2026 (Khamis)',
            en: '30 July 2026 (Thursday)'
        },
        time: '08:30 PM – 10:00 PM',
        location: {
            ms: 'Atas Talian / Zoom & Facebook Live',
            en: 'Online / Zoom & Facebook Live'
        },
        venue: {
            ms: 'Sesi Atas Talian (Link Zoom diberikan selepas pendaftaran)',
            en: 'Online Session (Zoom link provided upon registration)'
        },
        organizer: 'Cikgu KB & Komuniti Usahawan AI',
        summary: {
            ms: 'Sesi percuma 90 minit membongkar teknik menghasilkan arahan AI berstruktur tinggi (Background, Role, Objectives, Key Result, Expectation) untuk urusan memo, emel dan copywriting.',
            en: 'A free 90-minute session revealing high-structured AI prompting techniques (Background, Role, Objectives, Key Result, Expectation) for memos, emails, and copywriting.'
        },
        highlights: {
            ms: [
                'Pengenalan formula BROKE untuk Gemini & ChatGPT',
                'Demonstrasi perbandingan hasil prompt biasa vs prompt berstruktur',
                'Templat prompt percuma diberikan kepada peserta live'
            ],
            en: [
                'Introduction to the BROKE formula for Gemini & ChatGPT',
                'Live demonstration comparing plain vs structured prompt results',
                'Free prompt templates distributed to live attendees'
            ]
        },
        targetAudience: {
            ms: 'Penjawat Awam, Kakitangan Pentadbiran, Usahawan Mikro & Pelajar',
            en: 'Civil Servants, Administrative Staff, Micro Entrepreneurs & Students'
        },
        registrationUrl: 'https://wa.me/60133815817?text=Saya%20nak%20daftar%20Webinar%20Percuma%20BROKE%20Framework'
    },
    {
        id: 'in-house-training-public-sector-jun-2026',
        title: {
            ms: 'Bengkel In-House: Aplikasi AI Dalam Penyediaan Laporan & Memo Rasmi',
            en: 'In-House Workshop: AI Applications in Official Report & Memo Drafting'
        },
        type: 'corporate',
        status: 'completed',
        date: '2026-06-18',
        endDate: '2026-06-19',
        displayDate: {
            ms: '18 – 19 Jun 2026',
            en: '18 – 19 June 2026'
        },
        time: '09:00 AM – 05:00 PM',
        location: {
            ms: 'Putrajaya / Dewan Latihan Agensi Kerajaan',
            en: 'Putrajaya / Government Agency Training Hall'
        },
        venue: {
            ms: 'Pusat Latihan Sektor Awam, Putrajaya',
            en: 'Public Sector Training Centre, Putrajaya'
        },
        organizer: 'Agensi Kerajaan & KB Beyond Creative',
        summary: {
            ms: 'Latihan khas dalaman untuk pegawai agensi kerajaan menguasai penggunaan AI tempatan dan model bahasa besar secara selamat dan beretika dalam penyediaan dokumen rasmi.',
            en: 'Customized in-house training for government officers to master secure and ethical usage of LLMs in official document preparation.'
        },
        highlights: {
            ms: [
                'Melatih 45 pegawai sektor awam',
                'Simulasi ringkasan minit mesyuarat & penyediaan maklum balas aduan',
                'Penyusunan Katalog Prompt Kakitangan Awam'
            ],
            en: [
                'Trained 45 public sector officers',
                'Simulation of meeting minute summaries & public complaint replies',
                'Compilation of Civil Servant Prompt Catalog'
            ]
        },
        targetAudience: {
            ms: 'Pegawai & Kakitangan Jabatan Kerajaan',
            en: 'Government Department Officers & Staff'
        },
        registrationUrl: 'https://wa.me/60133815817?text=Tanya%20mengenai%20Latihan%20In-House%20Agensi'
    }
];
