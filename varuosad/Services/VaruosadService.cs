using Newtonsoft.Json;
using varuosad.Models;
namespace varuosad.Services
{
    public class VaruosadService : IVaruosadService
    {
        public VaruosadService() { }
        
        public string ReadData(string filePath)
        {
            var list = new List<VaruosadModel>();
            foreach (string line in File.ReadAllLines(filePath))
            {
                string[] fields = line.Split('\t');
                
                for (int i = 0; i < fields.Length; i++)
                { 
                    fields[i] = fields[i].Trim('\"');
                }

                var model = new VaruosadModel();
                model.productId = fields[0];
                model.productName = fields[1];
                model.packagingCost = float.Parse(fields[2]);
                model.packagingWeight = float.Parse(fields[3]);
                model.weight = float.Parse(fields[4]);
                model.variable1 = float.Parse(fields[5]);
                model.variable2 = float.Parse(fields[6]);
                model.remarks = fields[7];
                model.basePrice = float.Parse(fields[8]);
                model.brand = fields[9];
                model.retailPrice = float.Parse(fields[10]);
                list.Add(model);
            }

            string json = JsonConvert.SerializeObject(list, Formatting.Indented);
            return json;
        }

       


        
        
    }
}
