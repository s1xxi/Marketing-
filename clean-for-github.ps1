# Run before zipping or uploading: removes bulky folders (safe to re-create with npm install)
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here
foreach ($name in @("node_modules", "dist", ".vite")) {
  if (Test-Path $name) {
    Remove-Item -Recurse -Force $name
    Write-Host "Removed $name"
  }
}
Write-Host "Done. Folder is small enough for GitHub. Run: npm install"
