# Fablessi — Premium Bahçe Mobilyaları

İnegöl merkezli **Fablessi** markası için geliştirilen kurumsal web sitesi ve dijital ürün kataloğu. Bahçe ve dış mekan mobilyalarını premium, minimalist bir vitrin deneyimiyle sunar; koleksiyonlar, ürün galerileri, iletişim ve konum bilgilerini tek çatı altında toplar.

**Canlı depo:** [github.com/omerhd34/fablessi](https://github.com/omerhd34/fablessi)

![Fablessi bahçe mobilyası](public/acelya-oturma/antrasit-01.jpg)

---

## Proje Özeti

| | |
| **Marka** | Fablessi |
| **Sektör** | Bahçe & dış mekan mobilyası |
| **Konum** | İnegöl / Bursa |
| **Site türü** | Kurumsal vitrin + ürün kataloğu |
| **Dil** | Türkçe |

Site; ürün fotoğrafları, varyant renkleri (Antrasit, Cappuccino, Gri vb.), teknik ölçüler ve marka hikâyesini ziyaretçilere profesyonel bir arayüzle aktarmak için tasarlanmıştır. E-ticaret sepeti yerine **keşif odaklı** bir katalog yaklaşımı benimsenmiştir; WhatsApp ve telefon üzerinden doğrudan iletişim desteklenir.

---

## Öne Çıkan Özellikler

- **Ana sayfa vitrini** — Hero slider, son ürünler, koleksiyon vitrinleri, mimar seçkileri carousel
- **Ürün kataloğu** — Kategori ve koleksiyon filtreleri, sıralama, ürün detay sayfaları
- **Ürün mega menüsü** — 16+ ürün kategorisi görsel kartlarla hızlı erişim
- **SSS (Sıkça Sorulan Sorular)** — Kategorize edilmiş accordion yapısı
- **İletişim sayfası** — Showroom adresi, çalışma saatleri, telefon / WhatsApp / e-posta / Instagram ve gömülü harita
- **İletişim araçları** — Sabit WhatsApp / telefon butonları, footer iletişim alanı
- **Veritabanı destekli katalog** — Koleksiyon → Ürün → Varyant → Görsel hiyerarşisi (Prisma + MySQL)
- **Zengin medya arşivi** — Yüzlerce ürün fotoğrafı ve tanıtım videoları (`public/`)

---

## Ürün Koleksiyonları

Sitede yer alan başlıca ürün grupları:

| Seri | Ürünler |
|------|---------|
| **Açelya** | Oturma grubu — Antrasit, Cappuccino |
| **Aston** | Oturma grubu — Antrasit, Cappuccino |
| **Begonia** | Oturma grubu — Antrasit, Gri · 2'li oturma — Cappuccino |
| **Tesla** | Oturma grubu · Köşe grubu · Masa grubu · Salıncak |
| **Velar** | Oturma grubu · Köşe grubu · Masa grubu · Salıncak · Şezlong |
| **Trend** | Sallanır sandalye |

---

## Sayfa Durumu

| Sayfa | Adres | Durum |
|-------|-------|-------|
| Ana sayfa | `/` | Hazır |
| SSS | `/sss` | Hazır |
| Ürünler | `/urunler` | Hazır |
| Ürün detay | `/urunler/[slug]` | Hazır |
| İletişim | `/iletisim` | Hazır |
| Hakkımızda | `/hakkimizda` | Planlandı |

---

## Teknoloji Altyapısı

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Veritabanı | MySQL + [Prisma ORM](https://www.prisma.io/) |
| Carousel | Embla Carousel |
| İkonlar | React Icons |
| Dil | JavaScript (JSX) |

---

## Proje Yapısı

```
fablessi/
├── app/                    # Next.js sayfaları ve layout
│   └── (routes)/
│       ├── (anasayfa)/     # Ana sayfa
│       ├── iletisim/       # İletişim (adres, iletişim kanalları, harita)
│       ├── sss/            # SSS
│       └── urunler/        # Ürün listesi ve detay sayfaları
├── components/
│   ├── catalog/            # Ürün kataloğu bileşenleri
│   ├── faq/                # SSS bileşenleri
│   ├── home/               # Ana sayfa bileşenleri
│   ├── layout/             # Header, footer, navigasyon
│   ├── product/            # Ürün detay bileşenleri
│   ├── stores/             # İletişim / showroom vitrini
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── navigation.js       # Menü ve marka sabitleri
│   ├── site-contact.js     # Telefon, e-posta, sosyal medya
│   ├── stores.js           # Showroom ve harita bilgileri
│   └── queries/            # Veritabanı sorguları
├── prisma/
│   ├── schema.prisma       # Veritabanı şeması
│   └── seed.js             # Örnek koleksiyon verisi
└── public/                 # Ürün görselleri ve videolar
```

---

## Kurulum (Geliştiriciler İçin)

### Gereksinimler

- Node.js 20+
- MySQL veritabanı (yerel veya Neon / PlanetScale vb.)

### 1. Depoyu klonlayın

```bash
git clone https://github.com/omerhd34/fablessi.git
cd fablessi
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini ayarlayın

Proje kökünde `.env` dosyası oluşturun:

```env
# Veritabanı (zorunlu)
DATABASE_URL="mysql://KULLANICI:SIFRE@localhost:3306/fablessi"

# İletişim bilgileri (isteğe bağlı — footer ve iletişim bileşenleri)
NEXT_PUBLIC_SITE_PHONE="0XXX XXX XX XX"
NEXT_PUBLIC_SITE_EMAIL="info@fablessi.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="90XXXXXXXXXX"

# Sosyal medya (isteğe bağlı)
NEXT_PUBLIC_INSTAGRAM_URL=""
```

### 4. Veritabanını hazırlayın

```bash
npm run db:push      # Şemayı veritabanına uygular
npm run db:seed      # Örnek koleksiyon ve ürün verisi ekler
```

### 5. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## Kullanılabilir Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production derlemesi |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |
| `npm run db:push` | Prisma şemasını DB'ye uygular |
| `npm run db:seed` | Örnek veri yükler |
| `npm run db:studio` | Prisma Studio arayüzü |

---

## Veritabanı Modeli

```
Collection (Koleksiyon)
  └── Product (Ürün)
        ├── Variant (Renk / malzeme varyantı)
        └── Image (Galeri görseli)
```

Her ürün; slug, ad, açıklama, ölçü bilgisi ve yayın durumu (`isPublished`) ile yönetilir. Varyantlar renk ve malzeme seçeneklerini; görseller ise galeri sıralamasını ve kapak fotoğrafını (`isPrimary`) tutar.

---

## Dağıtım (Deployment)

Proje [Vercel](https://vercel.com), [Railway](https://railway.app) veya herhangi bir Node.js hosting ortamında çalıştırılabilir.

1. Depoyu bağlayın
2. `DATABASE_URL` ve `NEXT_PUBLIC_*` değişkenlerini ortam ayarlarına ekleyin
3. Build komutu: `npm run build`
4. Start komutu: `npm run start`

> Production ortamında MySQL bağlantısı zorunludur. Veritabanı olmadan ana sayfa ve ürün kataloğu boş liste gösterir; statik sayfalar (İletişim, SSS) normal çalışır.

---

## Medya Dosyaları

Ürün fotoğrafları `public/` altında kategorilere göre düzenlenmiştir:

- `public/acelya-oturma/`, `public/aston-oturma/`, `public/begonia-oturma/` …
- Tanıtım videoları: `public/Botanica Garden_s Ürün Videoları 25_/`

Yeni ürün eklerken görselleri ilgili klasöre koyup `lib/navigation.js` içindeki mega menüye referans verilmesi yeterlidir.

---

## Lisans

Bu proje özel mülkiyettedir. Tüm hakları Fablessi markasına aittir.

---

## İletişim

Proje veya site hakkında sorularınız için geliştirici ekibiyle iletişime geçebilirsiniz.
