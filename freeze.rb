require 'sinatra'
require 'sinatra/flash'
require 'google_weather'
require 'erb'

get '/' do
  @title = "WillItFreezeTonight.com"
  erb :index
end

enable :sessions

post '/weather' do

    begin
      place = params[:place]
      weather = GoogleWeather.new(place)
      forecast = weather.forecast_conditions[0]
      low = forecast.low.to_i
      if low <= 32
        @answer = "<div class='answer'>Yes</div><div class='today'>today's low is</div><div class='low'>#{low}&#176;F</div>"
      else
        @answer = "<div class='answer'>No</div><div class='today'>today's low is</div><div class='low'>#{low}&#176;F</div>"
      end
      
    rescue NoMethodError
        if place.downcase == "hell"
          @answer = "Probably not, but if the Cowboys won today... Yes and there is snow too!"
          erb :weather
        else
          flash[:warning] = "Either this place doesn't exist or we don't have access to weather info there.  Try searching for a nearby town or zipcode."
          redirect '/'
        end
    end
 
  erb :weather
end

get '/weather' do
 redirect '/'
end