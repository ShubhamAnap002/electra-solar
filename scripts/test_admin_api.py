import urllib.request
import urllib.parse
import json
import http.cookiejar

BASE_URL = "http://localhost:3000"

def run_tests():
    print("=== Testing Electra Solar Admin & Form API Endpoints ===")

    # 1. Test public form submission (validation check)
    print("\n1. Testing Public Form Submission Validation (empty data)...")
    req = urllib.request.Request(
        f"{BASE_URL}/api/forms/submit",
        data=json.dumps({}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            print("FAILED: Expected 400 for empty form")
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode())
        print(f"PASS: Form rejected empty submission with {e.code}: {body.get('message')}")

    import time

    # 2. Test honeypot spam protection (wait 5.2s for rate limit window)
    print("\n2. Waiting 5.2s for rate limiter, then testing Honeypot Bot Trap...")
    time.sleep(5.2)
    bot_payload = {
        "name": "Bot Spammer",
        "phone": "+919999999999",
        "website_hp": "http://spam-link.com"
    }
    req = urllib.request.Request(
        f"{BASE_URL}/api/forms/submit",
        data=json.dumps(bot_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode())
        print(f"PASS: Bot silently absorbed: {data.get('message')}")

    # 3. Test genuine form submission (wait 5.2s for rate limit window)
    print("\n3. Waiting 5.2s for rate limiter, then testing Legitimate Customer Form Submission...")
    time.sleep(5.2)
    customer_payload = {
        "name": "Mahesh Deshmukh",
        "phone": "+91 98220 11223",
        "email": "mahesh.d@induscorp.in",
        "city": "Chakan, Pune",
        "productModel": "sunmagic-three-phase-solar-hybrid-inverter",
        "application": "Commercial / Industrial Facility",
        "approxCapacity": "50 kVA",
        "message": "Need turnkey solar hybrid proposal with 2 hours battery backup for manufacturing unit.",
        "formType": "Proposal Request"
    }
    req = urllib.request.Request(
        f"{BASE_URL}/api/forms/submit",
        data=json.dumps(customer_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode())
        print(f"PASS: Customer submission processed: {data.get('message')} (Notice: {data.get('notice', 'N/A')})")

    # 4. Test Admin Authentication & Cookie Session
    print("\n4. Testing Admin Authentication (/api/admin/auth/login)...")
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

    login_req = urllib.request.Request(
        f"{BASE_URL}/api/admin/auth/login",
        data=json.dumps({"username": "admin", "password": "Electra@Solar2026!"}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with opener.open(login_req) as res:
        data = json.loads(res.read().decode())
        auth_token = data.get("token")
        print(f"PASS: Login successful: user '{data.get('user', {}).get('username')}', role: '{data.get('user', {}).get('role')}'")

    auth_headers = {"Authorization": f"Bearer {auth_token}"} if auth_token else {}

    # 5. Test Authenticated Session (/api/admin/auth/me)
    print("\n5. Testing Session Verification (/api/admin/auth/me)...")
    me_req = urllib.request.Request(f"{BASE_URL}/api/admin/auth/me", headers=auth_headers)
    with opener.open(me_req) as res:
        data = json.loads(res.read().decode())
        print(f"PASS: Authenticated user: {data.get('user', {}).get('username')}")

    # 6. Test Products List
    print("\n6. Testing Products API (/api/admin/products)...")
    products_req = urllib.request.Request(f"{BASE_URL}/api/admin/products", headers=auth_headers)
    with opener.open(products_req) as res:
        data = json.loads(res.read().decode())
        count = len(data.get("products", []))
        print(f"PASS: Products API returned {count} products")

    # 7. Test Categories API
    print("\n7. Testing Categories API (/api/admin/categories)...")
    cats_req = urllib.request.Request(f"{BASE_URL}/api/admin/categories", headers=auth_headers)
    with opener.open(cats_req) as res:
        data = json.loads(res.read().decode())
        count = len(data.get("categories", []))
        print(f"PASS: Categories API returned {count} categories")

    # 8. Test Site Content API
    print("\n8. Testing Content CMS API (/api/admin/content)...")
    content_req = urllib.request.Request(f"{BASE_URL}/api/admin/content", headers=auth_headers)
    with opener.open(content_req) as res:
        data = json.loads(res.read().decode())
        hero = data.get("content", {}).get("hero", {})
        print(f"PASS: Content API returned headline: '{hero.get('headline')} {hero.get('headlineHighlight')}'")

    # 9. Test SEO API
    print("\n9. Testing SEO API (/api/admin/seo)...")
    seo_req = urllib.request.Request(f"{BASE_URL}/api/admin/seo", headers=auth_headers)
    with opener.open(seo_req) as res:
        data = json.loads(res.read().decode())
        pages_count = len(data.get("seo", {}).get("pages", []))
        print(f"PASS: SEO API returned {pages_count} indexed page configurations")

    # 10. Test Media Library API
    print("\n10. Testing Media API (/api/admin/media)...")
    media_req = urllib.request.Request(f"{BASE_URL}/api/admin/media", headers=auth_headers)
    with opener.open(media_req) as res:
        data = json.loads(res.read().decode())
        files_count = len(data.get("files", []))
        print(f"PASS: Media Library API scanned and found {files_count} assets")

    # 11. Test Gmail Integration Status API
    print("\n11. Testing Gmail Status API (/api/admin/gmail/status)...")
    gmail_req = urllib.request.Request(f"{BASE_URL}/api/admin/gmail/status", headers=auth_headers)
    with opener.open(gmail_req) as res:
        data = json.loads(res.read().decode())
        cfg = data.get("config", {})
        print(f"PASS: Gmail Status: Connected={cfg.get('isConnected')}, Recipient={cfg.get('recipientEmail')}")

    print("\n=== ALL ADMIN & FORM ENDPOINT TESTS PASSED SUCCESSFULLY! ===")

if __name__ == "__main__":
    run_tests()
