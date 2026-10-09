import os
import shutil
import urllib.request

os.makedirs('public/images/products', exist_ok=True)
os.makedirs('public/images/hero', exist_ok=True)
os.makedirs('public/images/projects', exist_ok=True)
os.makedirs('public/images/brand', exist_ok=True)

# Copy the sleek 3D studio background
hero_src = r'C:\Users\User\Downloads\WhatsApp Image 2026-09-30 at 5.24.53 PM.jpeg'
if os.path.exists(hero_src):
    shutil.copy2(hero_src, 'public/images/hero/hero-bg.jpg')
    print('Copied hero background.')

images_to_download = {
    'public/images/products/sunmagic-1ph.webp': 'https://enertechups.com/wp-content/uploads/2026/10/Solar-PCU-14.webp',
    'public/images/products/sunmagic-3ph.webp': 'https://enertechups.com/wp-content/uploads/2025/05/Solar-PCU-6-2-300x300.webp',
    'public/images/products/enercube-bess.webp': 'https://enertechups.com/wp-content/uploads/2025/11/5KVA-10kWh-Mini-E-Storage-250x300.webp',
    'public/images/products/wall-mounted-hf.webp': 'https://enertechups.com/wp-content/uploads/2025/02/solar-266x300.webp',
    'public/images/products/battery-charger.png': 'https://enertechups.com/wp-content/uploads/2025/05/Battery-Charger-45-1-300x300.png',
    'public/images/products/lfp-battery.webp': 'https://enertechups.com/wp-content/uploads/2025/02/imgi_45-266x300.webp',
    'public/images/products/online-ups.webp': 'https://enertechups.com/wp-content/uploads/2025/05/Website-images-356x402-px-6-267x300.webp',
    'public/images/products/servo-stabilizer.webp': 'https://enertechups.com/wp-content/uploads/2025/05/Website-images-5-267x300.webp',
    'public/images/brand/enertech-partner.png': 'https://enertechups.com/wp-content/uploads/2022/10/Logo1-removebg-preview.png',
}

headers = {'User-Agent': 'Mozilla/5.0'}

for target_path, url in images_to_download.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            with open(target_path, 'wb') as f:
                f.write(content)
            print(f'Successfully downloaded {target_path} ({len(content)} bytes)')
    except Exception as e:
        print(f'Failed to download {url}: {e}')
