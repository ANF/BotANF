using namespace System.Runtime.InteropServices;

# If your PowerShell version is lower than 6, please consider upgrading
# your version instead of changing this as this script accesses some functions
# Not available on lower versions. *However*, you are good to go as long as you
# have npm installed and accessible i.e, added to the path.
if ($PSVersionTable.PSVersion.Major -lt 6) {
    [Console]::Write("[ERROR] PowerShell requires the minimum version to be 6.0.0");
    Start-Process "https://github.com/PowerShell/PowerShell/releases/latest/"
    [Environment]::Exit(1);
}

$Status = 0; # Number of operations completed.
$ProjectRoot = [System.IO.Directory]::GetCurrentDirectory();

function InstallPackages
{
    try {
        npm install
    } catch [System.Management.Automation.CommandNotFoundException] {
        [Console]::Write("npm was not found! Press y to install npm: ");
        $keycode = [Console]::Read();
        if ($keycode -eq 121 <# keycode of y #>) {
            if ((Test-Path -Path "bin") -eq ($false)) { mkdir bin }
            Set-Location bin
            $x64 = [Environment]::Is64BitOperatingSystem;
            if ($IsWindows) {
                if ($x64) {
                    Invoke-WebRequest -Uri "https://nodejs.org/dist/v14.16.0/node-v14.16.0-x64.msi" -Method "GET" -OutFile "NodeJS.msi"
                    Start-Process .\NodeJS.msi
                    [Environment]::Exit([Environment]::ExitCode)
                }
                else {
                    Invoke-WebRequest -Uri "https://nodejs.org/dist/v14.16.0/node-v14.16.0-x86.msi" -Method "GET" -OutFile "NodeJS-x86.msi"
                    Start-Process .\NodeJS-x86.msi
                    [Environment]::Exit([Environment]::ExitCode)
                }
            } elseif ($IsLinux) {
                if ($x64) {
                    #$distro = Invoke-Expression "lsb_release --short --id" # Get the Linux distribution name.
                    try { apt-get install nodejs -y } catch { <# Do nothing. #> }
                    try { pacman -S nodejs npm } catch { <# Do nothing. #> }
                    try { dnf module install nodejs } catch { <# Do nothing. #> }
                    [Environment]::Exit([Environment]::ExitCode)
                }
                else { throw "x86 build does not exist!" }
            } elseif ($IsMacOS) {
                # macOS is officially only x64.
                #Invoke-WebRequest -Uri "https://nodejs.org/dist/v14.16.0/node-v14.16.0.pkg" -Method "GET" -OutFile "NodeJS.pkg"
                #Start-Process .\NodeJS.pkg
                brew install node
                [Environment]::Exit([Environment]::ExitCode)
            } else {
                [Console]::Write("[ERROR] Platform is not Windows, Linux or macOS.");
                [Environment]::Exit(1);
            }
        } else { [Environment]::Exit([Environment]::ExitCode) }
    }
}

Write-Progress -Activity "Installing NPM Packages" -PercentComplete $Status
InstallPackages
Set-Location $ProjectRoot
$Status = 25

Write-Progress -Activity "Creating env file" -PercentComplete $Status
if ((Test-Path -Path ".env") -eq ($false)) {
    Write-Output 'TOKEN="Your Discord Bot API Access Key aka token"
PREFIX="The prefix to run commands for your bot"
MONGO="mongodb+srv://<Account>:<Password>@botanf-db.bg2nc.mongodb.net/<Database>?retryWrites=true&w=majority"' > '.env'
}
$Status = 50

Write-Progress -Activity "Opening folder" -PercentComplete $Status
Invoke-Item $ProjectRoot
$Status = 75

Write-Progress -Activity "Opening VS Code (if it exists)" -PercentComplete $Status
try {
    code .
} catch [System.Management.Automation.CommandNotFoundException] { <# Do nothing. #> }
$Status = 100

Write-Progress -Activity "Completed all tasks" -PercentComplete $Status

[Console]::ReadKey();
[Environment]::Exit([Environment]::ExitCode) # Exit after reading a key.
