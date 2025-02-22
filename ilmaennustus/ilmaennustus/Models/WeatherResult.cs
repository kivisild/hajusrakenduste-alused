namespace ilmaennustus.Models
{
    public class WeatherResult
    {
        
        public Geometry geometry {  get; set; }
        public Details details { get; set; }
        public Timeseries timeseries { get; set; }
        
        public class Data
        {
            public Instant instant { get; set; }
        }

        public class Instant
        {
            public Details details { get; set; }
        }

        public class Details
        {
            public float air_pressure_at_sea_level { get; set; }
            public float air_temperature { get; set; }
            public float cloud_area_fraction { get; set; }
            public float relative_humidity { get; set; }
            public float wind_from_direction { get; set; }
            public float wind_speed { get; set; }
            public int precipitation_amount { get; set; }
        }

        public class Geometry
        {
            public string type {  get; set; }
            public List<float> coordinates { get; set; }
        }

        public class Timeseries
        {
            public DateTime time { get; set; }
            public Data data { get; set; }
        }

        public class Properties
        {
            public List<Timeseries> timeseries { get; set; }
        }

        public class Root
        {
            public Geometry geometry { get; set; }
            public Properties properties { get; set; }
        }
    }

}
