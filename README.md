# Personal Portfolio & Blog Website Template (Turkish Below)

A modern, responsive personal portfolio and blog website built with HTML, CSS, and JavaScript. Features a clean design, multilingual support (English/Turkish), and dynamic content loading.

## Features

- 🌐 Multilingual support (English/Turkish)
- 📱 Fully responsive design
- 💼 Portfolio project showcase
- 📝 Blog system with Markdown support
- 🖼️ Image gallery with lightbox
- 🔗 Social media integration
- 📊 Dynamic content loading
- 🌓 Clean and modern UI

## Getting Started

### Prerequisites

- A web server (Apache, Nginx, etc.)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/isikmuhamm/personal-website-template.git
```

2. Configure your web server to serve the project directory
3. Update the content files in the `data` folder

## Project Structure

```
├── data/
│   ├── blog.json         # Blog posts data
│   ├── content.json      # Main content (about, experience, skills, etc.)
│   └── projects.json     # Portfolio projects data
├── script/
│   ├── style.css        # Main stylesheet
│   ├── utils.js         # Utility functions
│   └── ...             # Other JavaScript files
├── index.html           # Home page
├── blog.html           # Blog listing page
├── projects.html       # Projects listing page
└── footer.html         # Footer component
```

## Content Structure

### content.json
```json
{
  "about": {
    "name": "Your Name",
    "image": "./path/to/image.jpg",
    "content": {
      "tr": "Turkish description",
      "en": "English description"
    },
    "socialLinks": [...]
  },
  "experience": { ... },
  "skills": { ... },
  "education": [ ... ]
}
```

### blog.json
```json
{
  "posts": [
    {
      "id": 1,
      "title": {
        "tr": "Turkish title",
        "en": "English title"
      },
      "content": {
        "tr": "Turkish content in Markdown",
        "en": "English content in Markdown"
      },
      "image": "image-url",
      "tags": ["tag1", "tag2"],
      "date": "2023-01-01",
      "readTime": 5
    }
  ]
}
```

### projects.json
```json
{
  "projects": [
    {
      "id": 1,
      "title": {
        "tr": "Turkish title",
        "en": "English title"
      },
      "description": {
        "tr": "Turkish description",
        "en": "English description"
      },
      "thumbnail": "thumbnail-url",
      "images": ["image1-url", "image2-url"],
      "technologies": ["tech1", "tech2"],
      "liveUrl": "demo-url",
      "githubUrl": "github-url"
    }
  ]
}
```

## Customization

1. Update `content.json` with your personal information
2. Add your projects to `projects.json`
3. Create blog posts in `blog.json`
4. Modify the styling in `style.css`
5. Update social media links and other contact information


## Features in Detail

### Multilingual Support
- Content automatically displays in the selected language
- Easy language switching with a toggle button
- Fallback to English if translation is missing

### Blog System
- Markdown support for blog posts
- Reading time calculation
- Tags and categories
- Social sharing buttons

### Portfolio
- Project showcase with images
- Live demo and source code links
- Technology tags
- Image gallery with lightbox

### Gallery
- Responsive image grid
- Lightbox with navigation
- Touch support for mobile devices


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgments

- Font Awesome for icons
- Marked.js for Markdown parsing
- Picsum Photos for placeholder images

---

# Kişisel Portföy & Blog Websitesi

HTML, CSS ve JavaScript ile oluşturulmuş modern, responsive kişisel portföy ve blog websitesi. Temiz tasarım, çoklu dil desteği (İngilizce/Türkçe) ve dinamik içerik yükleme özellikleri sunar.

## Özellikler

- 🌐 Çoklu dil desteği (İngilizce/Türkçe)
- 📱 Tam responsive tasarım
- 💼 Portföy proje vitrini
- 📝 Markdown destekli blog sistemi
- 🖼️ Lightbox'lı görsel galerisi
- 🔗 Sosyal medya entegrasyonu
- 📊 Dinamik içerik yükleme
- 🌓 Temiz ve modern arayüz

## Başlangıç

### Gereksinimler

- Bir web sunucusu (Apache, Nginx, vb.)
- HTML, CSS ve JavaScript temel bilgisi

### Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/kullaniciadi/portfolio-website.git
```

2. Web sunucunuzu proje dizinini sunacak şekilde yapılandırın
3. `data` klasöründeki içerik dosyalarını güncelleyin

## Proje Yapısı

```
├── data/
│   ├── blog.json         # Blog yazıları verisi
│   ├── content.json      # Ana içerik (hakkında, deneyim, yetenekler, vb.)
│   └── projects.json     # Portföy projeleri verisi
├── script/
│   ├── style.css        # Ana stil dosyası
│   ├── utils.js         # Yardımcı fonksiyonlar
│   └── ...             # Diğer JavaScript dosyaları
├── index.html           # Ana sayfa
├── blog.html           # Blog listesi sayfası
├── projects.html       # Projeler listesi sayfası
└── footer.html         # Footer bileşeni
```

## İçerik Yapısı

### content.json
```json
{
  "about": {
    "name": "Adınız",
    "image": "./resim/yolu.jpg",
    "content": {
      "tr": "Türkçe açıklama",
      "en": "İngilizce açıklama"
    },
    "socialLinks": [...]
  },
  "experience": { ... },
  "skills": { ... },
  "education": [ ... ]
}
```

### blog.json
```json
{
  "posts": [
    {
      "id": 1,
      "title": {
        "tr": "Türkçe başlık",
        "en": "İngilizce başlık"
      },
      "content": {
        "tr": "Markdown formatında Türkçe içerik",
        "en": "Markdown formatında İngilizce içerik"
      },
      "image": "resim-url",
      "tags": ["etiket1", "etiket2"],
      "date": "2023-01-01",
      "readTime": 5
    }
  ]
}
```

### projects.json
```json
{
  "projects": [
    {
      "id": 1,
      "title": {
        "tr": "Türkçe başlık",
        "en": "İngilizce başlık"
      },
      "description": {
        "tr": "Türkçe açıklama",
        "en": "İngilizce açıklama"
      },
      "thumbnail": "önizleme-url",
      "images": ["resim1-url", "resim2-url"],
      "technologies": ["teknoloji1", "teknoloji2"],
      "liveUrl": "demo-url",
      "githubUrl": "github-url"
    }
  ]
}
```

## Özelleştirme

1. `content.json` dosyasını kişisel bilgilerinizle güncelleyin
2. Projelerinizi `projects.json` dosyasına ekleyin
3. Blog yazılarınızı `blog.json` dosyasında oluşturun
4. Stilleri `style.css` dosyasında değiştirin
5. Sosyal medya bağlantılarını ve diğer iletişim bilgilerini güncelleyin

## Detaylı Özellikler

### Çoklu Dil Desteği
- İçerik seçilen dilde otomatik görüntülenir
- Kolay dil değiştirme butonu
- Çeviri eksikse İngilizce'ye geri döner

### Blog Sistemi
- Blog yazıları için Markdown desteği
- Okuma süresi hesaplama
- Etiketler ve kategoriler
- Sosyal medya paylaşım butonları

### Portföy
- Resimlerle proje vitrini
- Canlı demo ve kaynak kod bağlantıları
- Teknoloji etiketleri
- Lightbox'lı görsel galerisi

### Galeri
- Responsive resim ızgarası
- Navigasyonlu lightbox
- Mobil cihazlar için dokunmatik destek

## Tarayıcı Desteği

- Chrome (en son sürüm)
- Firefox (en son sürüm)
- Safari (en son sürüm)
- Edge (en son sürüm)

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## Teşekkürler

- Simgeler için Font Awesome
- Markdown ayrıştırma için Marked.js
- Örnek resimler için Picsum Photos