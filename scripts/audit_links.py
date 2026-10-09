import os
import re

root_dir = r"c:\Users\User\Desktop\solar_website"
ignore_dirs = {".next", "node_modules", ".git"}

nested_button_issues = []
all_links = set()

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for file in files:
        if file.endswith((".tsx", ".jsx", ".ts")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                
            # Find <Link ...> ... <button
            matches = re.findall(r"(<Link[^>]*>[\s\S]*?<button[\s\S]*?</Link>)", content)
            if matches:
                nested_button_issues.append((filepath, len(matches)))
                
            # Find internal links href="/..."
            hrefs = re.findall(r'href=["\'](/[^"\']*)["\']', content)
            for h in hrefs:
                all_links.add((h, filepath))

print(f"Nested button inside Link issues: {len(nested_button_issues)}")
for path, count in nested_button_issues:
    print(f"  {path} ({count} instances)")

print(f"\nTotal unique internal link destinations: {len(all_links)}")
for href, path in sorted(all_links):
    if any(k in href for k in ["solutions", "products", "services", "projects"]):
        print(f"  {href} in {os.path.basename(path)}")
