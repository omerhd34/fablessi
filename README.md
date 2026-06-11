# Fablessi — Premium Bahçe Mobilyaları

İnegöl merkezli **Fablessi** markası için geliştirilen kurumsal web sitesi ve dijital ürün kataloğu. Bahçe ve dış mekan mobilyalarını premium, minimalist bir vitrin deneyimiyle sunar; koleksiyonlar, ürün galerileri, iletişim ve konum bilgilerini tek çatı altında toplar.

**Canlı depo:** [github.com/omerhd34/fablessi](https://github.com/omerhd34/fablessi)

![Fablessi bahçe mobilyası](public/acelya-oturma/antrasit-01.jpg)

---

## Proje Özeti

| Alan | Değer |
|------|-------|
| **Marka** | Fablessi |
| **Sektör** | Bahçe & dış mekan mobilyası |
| **Konum** | İnegöl / Bursa |
| **Site türü** | Kurumsal vitrin + ürün kataloğu |
| **Dil** | Türkçe (varsayılan) - İngilizce |

Site; ürün fotoğrafları, teknik ölçüler, malzeme bilgisi ve marka hikâyesini ziyaretçilere profesyonel bir arayüzle aktarmak için tasarlanmıştır. Her ürün kaydı kendi galerisiyle yönetilir; farklı renk veya konfigürasyonlar ayrı ürün olarak eklenir. E-ticaret sepeti yerine **keşif odaklı** bir katalog yaklaşımı benimsenmiştir; WhatsApp ve telefon üzerinden doğrudan iletişim desteklenir.

---

## Öne Çıkan Özellikler

- **Ana sayfa vitrini** — Hero slider, kategori vitrinleri, öne çıkan ürünler carousel, marka deneyimi banner
- **Çok dilli arayüz (i18n)** — Türkçe / İngilizce sözlükler, cookie tabanlı dil seçimi, veritabanı alanlarında `nameEn` / `descriptionEn` desteği
- **Ürün kataloğu** — Kategori ve koleksiyon sayfaları, sayfa içi arama, sıralama, ürün detay sayfaları
- **Ürün mega menüsü** — 6 kategori grubu, 16+ ürün görsel kartlarla hızlı erişim
- **Canlı arama** — Header arama çubuğu, debounce ile `/api/search` üzerinden koleksiyon ve ürün sonuçları
- **Ürün detay** — Galeri lightbox, malzeme bilgisi, parça bazlı ölçü tablosu, ilgili ürünler
- **Favoriler** — localStorage ile ürün kaydetme, kategori / koleksiyon filtreleri, arama ve sıralama
- **Misyon & Vizyon** — Marka değerleri, misyon ve vizyon içeriği
- **SSS (Sıkça Sorulan Sorular)** — Kategorize edilmiş accordion yapısı
- **İletişim sayfası** — Showroom adresi, çalışma saatleri, telefon / WhatsApp / e-posta / Instagram ve gömülü harita
- **İletişim araçları** — Sabit WhatsApp / telefon butonları, footer iletişim alanı
- **Veritabanı destekli katalog** — Koleksiyon → Ürün → Görsel hiyerarşisi (Prisma + MySQL, [TiDB Cloud](https://tidbcloud.com/))
- **Admin paneli** — Ürün, koleksiyon, kategori grubu ve site içeriklerini yönetme
- **Zengin medya arşivi** — Yüzlerce ürün fotoğrafı ve tanıtım videoları (`public/`)

---

## Ürün Koleksiyonları

Sitede yer alan başlıca ürün grupları:

<table>
  <thead>
    <tr>
      <th align="left" width="1%" nowrap>Seri</th>
      <th align="left">Ürünler</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="left" width="1%" nowrap><strong>Açelya</strong></td>
      <td>Oturma grubu</td>
    </tr>
    <tr>
      <td align="left" width="1%" nowrap><strong>Aston</strong></td>
      <td>Oturma grubu</td>
    </tr>
    <tr>
      <td align="left" width="1%" nowrap><strong>Begonia</strong></td>
      <td>Oturma grubu, 2'li oturma grubu</td>
    </tr>
    <tr>
      <td align="left" width="1%" nowrap><strong>Tesla</strong></td>
      <td>Oturma grubu - Köşe grubu - Masa grubu - Salıncak</td>
    </tr>
    <tr>
      <td align="left" width="1%" nowrap><strong>Velar</strong></td>
      <td>Oturma grubu - Köşe grubu - Masa grubu - Salıncak - Şezlong</td>
    </tr>
    <tr>
      <td align="left" width="1%" nowrap><strong>Trend</strong></td>
      <td>Sallanır sandalye</td>
    </tr>
  </tbody>
</table>

---

## Sayfa Durumu

| Sayfa | Adres | Durum |
|-------|-------|-------|
| Ana sayfa | `/` | Hazır |
| Ürünler | `/urunler` | Hazır |
| Ürün detay | `/urunler/[slug]` | Hazır |
| Favoriler | `/favoriler` | Hazır |
| Misyon & Vizyon | `/misyon-vizyon` | Hazır |
| SSS | `/sss` | Hazır |
| İletişim | `/iletisim` | Hazır |
| Hakkımızda | `/hakkimizda` | Hazır |
| KVKK / Gizlilik / Çerez | `/kvkk`, `/gizlilik-politikasi`, `/cerez-politikasi` | Hazır |

---

## Teknoloji Altyapısı

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React Compiler) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Base UI / Radix UI |
| Veritabanı | MySQL ([TiDB Cloud](https://tidbcloud.com/)) + [Prisma ORM](https://www.prisma.io/) 6 |
| HTTP istemcisi | Axios (dahili API çağrıları) |
| Carousel | Embla Carousel |
| Tablo | TanStack React Table |
| Bildirimler | Sonner |
| İkonlar | React Icons |
| Dil | JavaScript (JSX) |

---

## Proje Yapısı

```
fablessi/
├── app/
│   ├── (routes)/               # Sayfa rotaları
│   │   ├── (anasayfa)/         # Ana sayfa
│   │   ├── urunler/            # Ürün listesi ve detay ([slug])
│   │   ├── favoriler/          # Favori ürünler
│   │   ├── hakkimizda/         # Hakkımızda
│   │   ├── misyon-vizyon/      # Misyon & Vizyon
│   │   ├── sss/                # SSS
│   │   ├── iletisim/           # İletişim
│   │   ├── kvkk/               # KVKK
│   │   ├── gizlilik-politikasi/ # Gizlilik politikası
│   │   └── cerez-politikasi/   # Çerez politikası
│   ├── api/
│   │   ├── locale/             # Dil tercihi (cookie)
│   │   └── search/             # Katalog arama
│   ├── styles/                 # Global ve layout stilleri
│   ├── layout.jsx              # Kök layout
│   ├── error.jsx               # Hata sınırı
│   ├── loading.jsx             # Genel yükleme durumu
│   ├── not-found.jsx           # 404 sayfası
│   └── global-error.jsx        # Kök hata sayfası
├── components/
│   ├── about/                  # Hakkımızda bileşenleri
│   ├── catalog/                # Ürün kataloğu bileşenleri
│   ├── faq/                    # SSS bileşenleri
│   ├── favorites/              # Favori ürünler bileşenleri
│   ├── home/                   # Ana sayfa bileşenleri
│   ├── layout/                 # Header, footer, navigasyon, arama
│   ├── legal/                  # KVKK, gizlilik, çerez bileşenleri
│   ├── mission/                # Misyon & Vizyon bileşenleri
│   ├── product/                # Ürün detay bileşenleri
│   ├── status/                 # Yükleme, hata ve iskelet ekranlar
│   ├── stores/                 # Showroom vitrini
│   └── ui/                     # shadcn/ui primitives
├── contexts/
│   ├── locale-provider.jsx     # İstemci tarafı i18n bağlamı
│   └── favorites-provider.jsx  # Favori ürünler bağlamı
├── hooks/                      # Özel React hook'ları
├── lib/
│   ├── i18n/                   # Sözlükler, navigasyon, çeviri yardımcıları
│   ├── queries/                # Veritabanı sorguları (ürün, ana sayfa, arama)
│   ├── navigation.js           # Menü ve marka sabitleri
│   ├── site-contact.js         # Telefon, e-posta, sosyal medya
│   ├── stores.js               # Showroom ve harita bilgileri
│   ├── favorites.js            # Favori ürünler (localStorage)
│   ├── product-utils.js        # Ürün serileştirme ve fiyat yardımcıları
│   ├── axios.js                # API istemci yapılandırması
│   └── prisma.js               # Prisma istemcisi
├── prisma/
│   ├── schema.prisma           # Veritabanı şeması
│   └── seed.js                 # Koleksiyon ve ürün verisi
└── public/                     # Ürün görselleri, videolar ve marka varlıkları
```

---

## Kurulum (Geliştiriciler İçin)

### Gereksinimler

- Node.js 20+
- MySQL veritabanı — production ortamında [TiDB Cloud](https://tidbcloud.com/) Serverless; yerel geliştirme için TiDB Cloud bağlantısı veya yerel MySQL

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

Proje kökünde `.env` dosyası oluşturun (`.env.example` dosyasını referans alabilirsiniz):

```env
# Veritabanı (zorunlu) — TiDB Cloud bağlantı dizesi (Connect → General)
DATABASE_URL="mysql://KULLANICI:SIFRE@gateway01.REGION.prod.aws.tidbcloud.com:4000/fablessi?sslaccept=strict"

# Dahili API tabanı (Axios — arama vb.)
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

# Uygulama kök URL — OG/sosyal paylaşım görselleri için www ile eşleşmeli
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Üretim (Vercel): NEXT_PUBLIC_APP_URL="https://www.fablessi.com"

# İletişim bilgileri (isteğe bağlı — footer ve iletişim bileşenleri)
NEXT_PUBLIC_SITE_PHONE="0XXX XXX XX XX"
NEXT_PUBLIC_SITE_PHONE_HREF="tel:+90XXXXXXXXXX"
NEXT_PUBLIC_SITE_EMAIL="info@fablessi.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="90XXXXXXXXXX"

# Sosyal medya (isteğe bağlı)
NEXT_PUBLIC_INSTAGRAM_URL=""
```

### 4. Veritabanını hazırlayın

```bash
npm run db:push      # Şemayı veritabanına uygular
npm run db:seed      # Koleksiyon ve ürün verisi ekler
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
| `npm run build` | Prisma client üretimi + production derlemesi |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |
| `npm run db:generate` | Prisma client üretir |
| `npm run db:push` | Prisma şemasını DB'ye uygular |
| `npm run db:migrate` | Geliştirme migrasyonu oluşturur / uygular |
| `npm run db:seed` | Örnek veri yükler |
| `npm run db:studio` | Prisma Studio arayüzü |

---

## Veritabanı Modeli

```
Collection (Koleksiyon)
  └── Product (Ürün)
        └── Image (Galeri görseli)
```

Her ürün; slug, ad, açıklama, malzeme (`material`, `materialEn`), ölçü bilgisi (`dimensions`, `dimensionItems` JSON) ve yayın durumu (`isPublished`) ile yönetilir. Görseller doğrudan ürüne bağlanır. Ana sayfa vitrini için `isFeatured` ve `featuredOrder` alanları kullanılır. Koleksiyon, ürün ve görsel kayıtlarında İngilizce karşılıklar (`nameEn`, `descriptionEn`, `altEn` vb.) tutulur.

---

## Çok Dilli Yapı (i18n)

- Varsayılan dil **Türkçe**; desteklenen diller: `tr`, `en`
- Arayüz metinleri `lib/i18n/dictionaries/` altındaki sözlük dosyalarından yüklenir
- Dil tercihi `fablessi_locale` cookie'si ile saklanır; `POST /api/locale` ile güncellenir
- Sunucu bileşenleri `getServerDictionary()` ile, istemci bileşenleri `useTranslations()` hook'u ile çeviri alır
- Navigasyon ve mega menü `lib/i18n/build-navigation.js` ve `lib/i18n/navigation-data.js` üzerinden oluşturulur

---

## Dağıtım (Deployment)

Proje [Vercel](https://vercel.com), [Railway](https://railway.app) veya herhangi bir Node.js hosting ortamında çalıştırılabilir. Üretim veritabanı [TiDB Cloud](https://tidbcloud.com/) Serverless üzerinde barındırılır; Prisma MySQL sürücüsü ile doğrudan uyumludur.

1. [TiDB Cloud](https://tidbcloud.com/) konsolundan cluster oluşturun ve bağlantı dizesini alın
2. Depoyu hosting ortamına bağlayın
3. `DATABASE_URL` (TiDB Cloud) ve `NEXT_PUBLIC_*` değişkenlerini ortam ayarlarına ekleyin
4. Build komutu: `npm run build`
5. Start komutu: `npm run start`

> Production ortamında TiDB Cloud / MySQL bağlantısı zorunludur. Veritabanı olmadan ana sayfa ve ürün kataloğu boş liste gösterir; statik sayfalar (İletişim, SSS, Misyon & Vizyon) normal çalışır.

---

## Medya Dosyaları

Ürün fotoğrafları `public/` altında kategorilere göre düzenlenmiştir:

- `public/acelya-oturma/`, `public/aston-oturma/`, `public/begonia-oturma/` …

Yeni ürün eklerken admin panelinden görseller yüklenebilir; seed verisi için görseller `public/` altına konur ve `prisma/seed.js` ile `lib/i18n/navigation-data.js` güncellenir. Aynı modelin farklı renkleri ayrı ürün kaydı olarak eklenir.

---

## Lisans

Bu proje özel mülkiyettedir. Tüm hakları Fablessi markasına aittir.

---

## İletişim

Proje veya site hakkında sorularınız için geliştirici ekibiyle iletişime geçebilirsiniz.
