from django.http import JsonResponse
import requests as req
from django.views import View
from datetime import datetime
# Create your views here.
# backend/api/views.py


class Get_data(View):
    def get(self,request,name):
        response=req.get(f'https://us1.locationiq.com/v1/search?key=pk.6df0b5456c55c2a98f14b95170130c43&q={name}&format=json&')
        data={'lat':response.json()[0]['lon'],'lon':response.json()[0]['lat'],'name':response.json()[0]['display_name']}
        curr_data=Curr_data()
        curr_response=curr_data.get(latitude=data['lat'],longitude=data['lon'])
        forecast_data=Forecast_data()
        forecast_response=forecast_data.get(latitude=data['lat'],longitude=data['lon'])
        com_data={'curr_data':
                             {'weather':curr_response["weather"],'temp':curr_response['main']['temp'],'hum':curr_response['main']['humidity'],'wind':curr_response['wind'],'name':data['name'].split(', ')},
                             'forecast_data':forecast_response}
        return JsonResponse(com_data)



class Curr_data():
    def get(self,latitude, longitude):
        lat = float(latitude)
        lon = float(longitude)
        response = req.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=fa0ddf42b54a1163ac6bb4d4bf6aa1f1')
        json_data=response.json()
        return json_data
    
    
    
class Forecast_data():
    def get(self,latitude, longitude):
        lat = float(latitude)
        lon = float(longitude)
        response = req.get(f'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=fa0ddf42b54a1163ac6bb4d4bf6aa1f1')
        json_data=response.json()
        curr_date=datetime.now().date().strftime("%Y-%m-%d")
        data_arr=json_data['list']
        fore_date_arr=[]
        for item in data_arr:
            if(item['dt_txt'].split()[0]!=curr_date):
               fore_date_arr.append(item)
        foredate_arr=[]
        for  item in fore_date_arr:
            if(item['dt_txt'].split()[0] not in foredate_arr):
                foredate_arr.append(item['dt_txt'].split()[0])
        date_arr=[[] for _ in range(5)]
        days_of_week=Days_of_week()
        for i in range(5):
            date_arr[i]=days_of_week.get(foredate_arr[i])
        emp_arr=[[] for _ in range(5)]
        for i in range(5):
            for item in fore_date_arr:
                if foredate_arr[i] == item['dt_txt'].split()[0]:
                    emp_arr[i].append(item)
        fore_date_arr=[[] for _ in range(5)]
        for i in range(5):
            max_temp,min_temp,min,max=emp_arr[i][0]['main']['temp'],emp_arr[i][0]['main']['temp'],0,0
            for index,item in enumerate(emp_arr[i]):
                if(item['main']['temp']>max_temp):
                    max_temp=item['main']['temp']
                    max=index
                if(item['main']['temp']<min_temp):
                    min_temp=item['main']['temp']
                    min=index
            fore_date_arr[i].append({'max':{'temp':emp_arr[i][max]['main']['temp'],'humidity':emp_arr[i][max]['main']['humidity'],'weather':emp_arr[i][max]['weather'],'wind':emp_arr[i][max]['wind']}})
            fore_date_arr[i].append({'min':{'temp':emp_arr[i][min]['main']['temp'],'humidity':emp_arr[i][min]['main']['humidity'],'weather':emp_arr[i][min]['weather'],'wind':emp_arr[i][min]['wind']}})
        fore_date_arr.append({'dates':date_arr})
        return fore_date_arr
    
    
    
class Days_of_week():
    def get(self,date):
        days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
        date_arr=date.split('-')
        index=datetime(int(date_arr[0]),int(date_arr[1]),int(date_arr[2])).weekday()
        return days[index]