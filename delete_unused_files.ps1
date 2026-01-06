$files = @(
    "ECommerceApplication Frontend\src\App.css",
    "ECommerceApplication Frontend\src\pages\customer\HomePage.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconAddress.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconBox.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconCard.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconHeart.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconReview.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconTicket.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconTruck.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconUser.jsx",
    "ECommerceApplication Frontend\src\components\icons\IconWallet.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file"
    } else {
        Write-Host "File not found (already deleted): $file"
    }
}

Write-Host "Cleanup complete."
