import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  // http constructor
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    let countryPath = document.querySelectorAll<SVGPathElement>('path');

    Array.prototype.forEach.call(countryPath, (svgCountry: SVGPathElement) => {
      svgCountry.addEventListener('mouseover', (event: MouseEvent) => {
        const path = event.target as SVGPathElement;
        path.style.fill = 'orange';
      });

      svgCountry.addEventListener('mouseleave', (event: MouseEvent) => {
        const path = event.target as SVGPathElement;
        path.style.fill = '';
      });

      svgCountry.addEventListener('click', () => {
        this.countryData(svgCountry);
      });
    });
  }

  // from app-test-1 + HTTP SERVICE?
  async countryData(svgCountry: SVGPathElement) {
    const url = `https://api.worldbank.org/V2/country/${svgCountry.id}?format=json`;

    this.http.get(url).subscribe((data: any) => {
      const dataPath: any = data[1];
      const name: string = dataPath[0].name;
      document.getElementById('name')!.innerText = name;

      const capital: string = dataPath[0].capitalCity;
      document.getElementById('capital')!.innerText = capital;

      const region: string = dataPath[0].region.value;
      document.getElementById('region')!.innerText = region;

      const income: string = dataPath[0].incomeLevel.value;
      document.getElementById('income')!.innerText = income;

      const longitude: string = dataPath[0].longitude;
      document.getElementById('longitude')!.innerText = longitude;

      const latitude: string = dataPath[0].latitude;
      document.getElementById('latitude')!.innerText = latitude;
    });
  }
}
