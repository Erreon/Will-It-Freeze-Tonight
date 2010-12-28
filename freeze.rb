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

  rescue NoMethodError
    redirect '/'
  end

  if low <= 32
    @title = "Yes"
    @answer = "Yes, today's low is #{low}F"
  else
    @title = "No"
    @answer = 'No'
  end
  erb :weather
end

get '/weather' do
 redirect '/'
end