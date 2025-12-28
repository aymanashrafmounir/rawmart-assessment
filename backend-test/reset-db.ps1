# Reset MySQL Database Script
# Usage: .\reset-db.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host " Resetting Task Manager Database" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Drop and recreate database
docker exec task_manager_mysql mysql -u root -proot123 -e "DROP DATABASE IF EXISTS task_manager; CREATE DATABASE task_manager;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Database reset successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now restart the Spring Boot server:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  mvn spring-boot:run" -ForegroundColor White
} else {
    Write-Host "[ERROR] Failed to reset database" -ForegroundColor Red
    Write-Host "Make sure Docker is running and MySQL container is up" -ForegroundColor Red
}
