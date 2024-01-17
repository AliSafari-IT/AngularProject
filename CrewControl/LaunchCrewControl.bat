@echo off
c:
cd C:\VS\AngularProject\CrewControl
start cmd /k ng serve --host 0.0.0.0
start powershell -Command "Start-Process chrome http://localhost:4200"
