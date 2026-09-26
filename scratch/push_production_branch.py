import subprocess
import shutil
import os

repo_url = "https://github.com/Bs00002/PUJYA-AGRITECH-.git"
dist_dir = os.path.abspath("dist")
temp_dir = os.path.abspath("scratch/production_deploy")

def copy_dist():
    os.makedirs(temp_dir, exist_ok=True)
    # Copy all files/dirs from dist to temp_dir (excluding .git)
    for item in os.listdir(dist_dir):
        src = os.path.join(dist_dir, item)
        dst = os.path.join(temp_dir, item)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)

copy_dist()
print(f"Copied dist files to {temp_dir}")

commands = [
    ["git", "init"],
    ["git", "checkout", "-B", "production"],
    ["git", "add", "."],
    ["git", "commit", "-m", "Deploy latest production build with About Us, leadership media, workflow, and FAQs"],
    ["git", "remote", "set-url", "origin", repo_url] if os.path.exists(os.path.join(temp_dir, ".git", "config")) else ["git", "remote", "add", "origin", repo_url],
    ["git", "push", "--force", "origin", "production"]
]

for cmd in commands:
    print("Running:", " ".join(cmd))
    res = subprocess.run(cmd, cwd=temp_dir, capture_output=True, text=True)
    print(res.stdout)
    if res.stderr:
        print("ERR:", res.stderr)

print("Production branch push script finished.")
