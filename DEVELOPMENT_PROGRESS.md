# Geliştirme durumu

## 2026-11-11 — İzleme ekranını gerçek veri akışına uyarlama

- Otomatik model dönüşü, sürükleme, yön tuşları, görünümü sıfırlama ve animasyon kontrolleri kaldırıldı.
- Model yalnızca sağlayıcıdan gelen eğim/şarj bilgisiyle güncellenir; sürekli render yerine değişiklik olduğunda render edilir.
- Sabit örnek eğim, batarya, şarj ve grafik verileri kaldırıldı. Bağlantı yokken ölçüm gösterilmez; modelin nötr duruşunun ölçüm olmadığı belirtilir.
- İzleme ekranındaki testlere yönlendirme kartı kaldırıldı. Testler kendi sekmesinde kaldı.
- Ayarlardaki örnek veri ve animasyon anahtarları kaldırıldı. Simülasyon mimarisi korunur; etiket ileride yalnızca gerçek bir simülasyon sağlayıcısının verisi geldiğinde gösterilir.
- Donanım bağlantısı, sürekli simülasyon ve kamera kalibrasyonu henüz uygulanmadı. Native cihaz doğrulaması yapılmadı.

## Kamera kalibrasyonu — önerilen yaklaşım (henüz uygulanmadı)

1. Seçilen telefon kamerası, çözünürlük ve lens/zoom için boyutları bilinen dama veya ChArUco deseni farklı açılardan görüntülenir. Kamera iç parametreleri ve lens bozulması hesaplanır.
2. Telefon deney sırasında sabitlenir. Zemindeki ölçüsü bilinen referans işaretleriyle dünya koordinatları ve zemin dönüşümü tanımlanır.
3. Robot üzerindeki işaretin yerden yüksekliği ve gövdeye göre konumu hesaba katılır; gövde üzerindeki piksel hareketine doğrudan zemin dönüşümü uygulanmaz. Gerekirse kalibre kamera ve bilinen marker boyutuyla 3B poz kestirimi kullanılır.
4. Ölçüsü bilinen bağımsız mesafelerle doğrulama yapılır. Hata sınırları şartname ve deneylere göre belirlenir; bu aşamada zorunlu eşik uydurulmaz.
5. Kamera konumu değişirse zemin referansı yeniden kurulur; lens/zoom/çözünürlük değişirse ilgili kalibrasyon yeniden değerlendirilir. Geçerli kalibrasyon olmadan metre cinsinden ölçüm raporlanmaz.

Robot telemetrisindeki eğimin 3B modelde gösterilmesi kamera kalibrasyonuna bağlı değildir.

Kaynaklar: [OpenCV kalibrasyon](https://docs.opencv.org/doc/doxygen/html/d4/d94/tutorial_camera_calibration.html), [düzlemsel dönüşüm](https://github.com/opencv/opencv/blob/5.x/doc/tutorials/features/homography/homography.markdown).

## İzleme görünümü düzeltmesi

- Ekran başlıklarının altındaki açıklama metinleri ve robot türü alt başlığı kaldırıldı.
- Fare/dokunma ile yatay sürükleme ve sağ/sol okları geri getirildi. Bu kontrol yalnızca modelin inceleme açısını değiştirir, telemetri eğimini değiştirmez.
- Otomatik dönüş, sıfırlama ve örnek ölçümler geri eklenmedi.
- Pil gerilimi mevcut zorunlu telemetri sözleşmesinde bulunmadığı için eklenmedi.

## Bluetooth bağlantı sekmesi

- Ayarlar yerine Bağlantı sekmesi eklendi; eski /settings adresi /connection adresine yönlenir.
- Uygulama bilgileri ve sabit ayarlar dişli düğmesinden açılır.
- Bluetooth LE için cihaz alanı, gerçek telemetri özeti ve açıkça hedef olarak belirtilen 1 Hz / >2 saniye koşulları gösterilir.
- Tarama düğmesi açıklamasıyla devre dışıdır. Gerçek BLE sağlayıcısı, izin akışı, cihaz kimliği, servis/karakteristik UUID'leri ve paket protokolü henüz tanımlanmadı. Bu ekran başarılı bağlantı testi iddia etmez.
- Yeni bağımlılık veya sahte cihaz/telemetri eklenmedi.

## Bağlantı durum ayrıntıları

- Robot bağlantısı, veri alımı, son bildirilen hata, telefon Bluetooth durumu ve izin durumu ayrı gösterilir. Telefon durumu/izinler henüz sorgulanmadığından “Kontrol edilmedi” olarak belirtilir.
- Bluetooth özelliklerine cihaz adı/kimliği, RSSI, servis yapılandırması ve veri içeriği eklendi. Donanımdan gelmeyen bilgiler “Veri yok” olarak gösterilir.
- Batarya sekmesi eklenmedi; ayrı ekran ihtiyacı değerlendiriliyor.
