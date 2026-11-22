import subprocess

for pid in [1, 2, 3, 5, 7, 10]:
    p = subprocess.run(['php', '-r', f'$_GET["id"]={pid}; include "project.php";'], capture_output=True, text=True)
    print(f'project.php (id={pid}): code {p.returncode}, length {len(p.stdout)}')
    if p.stderr:
        print(f'Error for {pid}: {p.stderr}')
