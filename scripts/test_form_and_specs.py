import urllib.request
import re

url = "http://localhost:3000/products/bess/enercube-commercial-battery-energy-storage-system"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req).read().decode("utf-8")

print("Checking Product Page:")
print("- 'id=\"specifications\"' present:", 'id="specifications"' in html)
print("- 'scroll-mt-28' present:", 'scroll-mt-28' in html)
print("- 'Full Specs' anchor present:", 'Full Specs' in html)
print("- 'Verified Technical Specifications' present:", 'Verified Technical Specifications' in html)
print("- 'Lithium Iron Phosphate' present:", 'Lithium Iron Phosphate' in html)

contact_url = "http://localhost:3000/contact"
req_c = urllib.request.Request(contact_url, headers={"User-Agent": "Mozilla/5.0"})
html_c = urllib.request.urlopen(req_c).read().decode("utf-8")

print("\nChecking Contact Form Fields (from Screenshot 2):")
for field in [
    'placeholder="Your Name"',
    'placeholder="Company Name"',
    'placeholder="Mobile Number"',
    'placeholder="Enter your city"',
    'placeholder="Email Address"',
    'placeholder="Company Address"',
    'placeholder="Your Message"',
    'SUBMIT REQUEST'
]:
    print(f"- {field}:", field in html_c)
