import subprocess
import shutil
import os

repo_url = "https://github.com/Bs00002/PUJYA-AGRITECH-.git"
dist_dir = os.path.abspath("dist")
temp_dir = os.path.abspath("scratch/production_deploy")

if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)

# Ensure dist exists and has index.html
if not os.path.exists(os.path.join(dist_dir, "index.html")):
    print("dist/index.html not found, running npm run build first...")
    subprocess.run(["npm", "run", "build"], check=True, shell=True)

# Copy dist files to temp directory
shutil.copytree(dist_dir, temp_dir)
print(f"Copied dist files to {temp_dir}")

# Initialize git in temp directory
commands = [
    ["git", "init"],
    ["git", "checkout", "-b", "production"],
    ["git", "add", "."],
    ["git", "commit", "-m", "Deploy pre-built production dist/ files for Hostinger hPanel"],
    ["git", "remote", "add", "origin", repo_url],
    ["git", "push", "--force", "origin", "production"]
]

for cmd in commands:
    print("Running:", " ".join(cmd))
    res = subprocess.run(cmd, cwd=temp_dir, capture_output=True, text=True)
    print(res.stdout)
    if res.stderr:
        print("ERR:", res.stderr)
    if res.returncode != 0:
        print(f"Failed with code {res.returncode}")
        break

print("Production branch push script finished.")
