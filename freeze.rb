require 'sinatra'
require 'google_weather'
require 'erb'

get '/' do
  @title = "WillItFreezeTonight.com"
  erb :index
end

post '/weather' do

    begin
      place = params[:place]
      weather = GoogleWeather.new(place)
      forecast = weather.forecast_conditions[0]
      low = forecast.low.to_i
      if low <= 32
        @answer = "Yes, today's low is #{low}F"
      else
        @title = "No"
        @answer = "No, today's low is #{low}F"
      end
      
    rescue NoMethodError
        if place.downcase == "hell"
          @answer = "Probably not, but if the Cowboys won today... Yes and there is snow too!"
          erb :weather
        else
          redirect '/'
        end
    end
 
  erb :weather
end

get '/weather' do
 redirect '/'
end