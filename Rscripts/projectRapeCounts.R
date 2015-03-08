d<-read.csv("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/rapeDataTest.csv", header=TRUE,as.is=TRUE)

rc<-c()

for (i in 2003:2012){
  rc<-c(rc, sum(d$Count[d$Year==i & d$Count != (-1)]))
}

xOrig<-2003:2012

