# API Test Script for Virtual Museum API
# Run: .\API-Tests.ps1
# Ensure API is running on http://localhost:5209

$baseUrl = "http://localhost:5209"
$token = $null
$adminToken = $null

function Invoke-Api {
    param($Method, $Url, $Body = $null, $UseToken = $false, $UseAdminToken = $false)
    $headers = @{ "Content-Type" = "application/json" }
    $t = if ($UseAdminToken) { $adminToken } else { $token }
    if ($UseToken -and $t) { $headers["Authorization"] = "Bearer $t" }
    $params = @{ Uri = $Url; Method = $Method; Headers = $headers }
    if ($Body) { $params["Body"] = ($Body | ConvertTo-Json -Depth 10) }
    try {
        $resp = Invoke-WebRequest @params -UseBasicParsing -ErrorAction SilentlyContinue
        if ($resp.StatusCode -eq 500) { Write-Host "ERROR: Endpoint returned 500 Internal Server Error"; return $null }
        return $resp.Content | ConvertFrom-Json
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code -eq 500) { Write-Host "ERROR: 500 Internal Server Error" }
        return $null
    }
}

Write-Host "=== 1. Register New User ==="
$reg = Invoke-Api -Method POST -Url "$baseUrl/api/auth/register" -Body @{
    fullName = "Test User"
    email = "testuser@museum.com"
    region = "Europe"
    password = "Test@123"
}
if ($reg) { Write-Host "OK: $($reg | ConvertTo-Json -Compress)" } else { Write-Host "FAILED" }

Write-Host "`n=== 2. Login (User) ==="
$login = Invoke-Api -Method POST -Url "$baseUrl/api/auth/login" -Body @{ email = "testuser@museum.com"; password = "Test@123" }
if ($login -and $login.data) { $token = $login.data.token; Write-Host "OK: Token received" } else { Write-Host "FAILED" }

Write-Host "`n=== 3. Login (Admin) ==="
$adminLogin = Invoke-Api -Method POST -Url "$baseUrl/api/auth/login" -Body @{ email = "admin@museum.com"; password = "admin@123" }
if ($adminLogin -and $adminLogin.data) { $adminToken = $adminLogin.data.token; $token = $adminToken; Write-Host "OK: Admin token received" } else { Write-Host "FAILED" }

Write-Host "`n=== 4. GET Artifacts (Anonymous) ==="
$artifacts = Invoke-Api -Method GET -Url "$baseUrl/api/artifacts"
if ($artifacts -and $artifacts.data) { Write-Host "OK: $($artifacts.data.Count) artifacts" } else { Write-Host "FAILED" }

Write-Host "`n=== 5. GET Categories (Anonymous) ==="
$cats = Invoke-Api -Method GET -Url "$baseUrl/api/categories"
if ($cats -and $cats.data) { Write-Host "OK: $($cats.data.Count) categories" } else { Write-Host "FAILED" }

Write-Host "`n=== 6. GET Eras (Anonymous) ==="
$eras = Invoke-Api -Method GET -Url "$baseUrl/api/eras"
if ($eras -and $eras.data) { Write-Host "OK: $($eras.data.Count) eras" } else { Write-Host "FAILED" }

Write-Host "`n=== 7. GET Materials (Anonymous) ==="
$mats = Invoke-Api -Method GET -Url "$baseUrl/api/materials"
if ($mats -and $mats.data) { Write-Host "OK: $($mats.data.Count) materials" } else { Write-Host "FAILED" }

Write-Host "`n=== 8. GET Tags (Anonymous) ==="
$tags = Invoke-Api -Method GET -Url "$baseUrl/api/tags"
if ($tags -and $tags.data) { Write-Host "OK: $($tags.data.Count) tags" } else { Write-Host "FAILED" }

Write-Host "`n=== 9. GET Users (Admin) ==="
$users = Invoke-Api -Method GET -Url "$baseUrl/api/users" -UseToken $true -UseAdminToken $true
if ($users -and $users.data) { Write-Host "OK: $($users.data.Count) users" } else { Write-Host "FAILED" }

Write-Host "`n=== 10. Forgot Password Request ==="
$fpReq = Invoke-Api -Method POST -Url "$baseUrl/api/auth/forgot-password/request" -Body @{ email = "testuser@museum.com" }
if ($fpReq) { Write-Host "OK" } else { Write-Host "FAILED" }

Write-Host "`n=== 11. Forgot Password Reset ==="
$fpReset = Invoke-Api -Method POST -Url "$baseUrl/api/auth/forgot-password/reset" -Body @{
    email = "testuser@museum.com"
    otpCode = "0000"
    newPassword = "NewTest@123"
    confirmPassword = "NewTest@123"
}
if ($fpReset -and $fpReset.success) { Write-Host "OK" } else { Write-Host "FAILED" }

Write-Host "`n=== 12. Login with New Password ==="
$newLogin = Invoke-Api -Method POST -Url "$baseUrl/api/auth/login" -Body @{ email = "testuser@museum.com"; password = "NewTest@123" }
if ($newLogin -and $newLogin.data) { Write-Host "OK: Password reset verified" } else { Write-Host "FAILED" }

Write-Host "`n=== Tests Complete ==="
